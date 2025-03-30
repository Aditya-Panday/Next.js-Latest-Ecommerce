import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // ✅ Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) {
      return NextResponse.json({ message: "Email required." }, { status: 400 });
    }
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    // ✅ Check if email already exists
    const checkSubscriber = `SELECT COUNT(*) AS count FROM subscribers WHERE email = ?`;
    const [result] = await db.query(checkSubscriber, [email]);

    if (result[0].count > 0) {
      return NextResponse.json(
        { message: "This email already exists." },
        { status: 400 }
      );
    }

    // ✅ Insert the subscriber (Use parameterized query to prevent SQL injection)
    const addSubscriber = `INSERT INTO subscribers (email) VALUES (?)`;
    await db.query(addSubscriber, [email]);

    return NextResponse.json(
      { status: 200, message: "Thanks for register." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // ✅ Parse query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    // ✅ Fetch data ordered by latest subscription date
    const getSubscribers = `
      SELECT * FROM subscribers 
      ORDER BY id DESC 
      LIMIT ? OFFSET ?
    `;
    const [subscribersData] = await db.query(getSubscribers, [limit, offset]);

    // ✅ Get total count (without offset/limit)
    const countQuery = `SELECT COUNT(*) AS total FROM subscribers`;
    const [countResult] = await db.query(countQuery);

    const total = countResult[0]?.total || 0;

    return NextResponse.json({
      status: true,
      data: subscribersData,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
