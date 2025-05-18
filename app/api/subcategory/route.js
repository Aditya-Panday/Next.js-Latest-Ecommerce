import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();

    // Validate required fields.
    if (!name) {
      return NextResponse.json(
        { message: "Subcategory name is required." },
        { status: 400 }
      );
    }

    // Check if subcategory name exists.
    const checkSub = `SELECT COUNT(*) AS count FROM subcategory WHERE name = ?`;
    const [result] = await db.query(checkSub, [name]);

    if (result[0].count > 0) {
      return NextResponse.json(
        { message: "This Subcategory name already exists." },
        { status: 400 }
      );
    }

    // Add the new subcategory
    const addSub = `INSERT INTO subcategory (name) VALUES (?)`;
    await db.query(addSub, [name]);

    return NextResponse.json({
      status: true,
      message: "Subcategory created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);

    let id = parseInt(searchParams.get("id")) || "";

    // Validate required fields

    if (!id) {
      return NextResponse.json({
        message: "Product id required.",
        status: 400,
      });
    }

    // Check if brand exists
    const checkSubExist = `SELECT COUNT(*) AS count FROM subcategory WHERE id = ?`;
    const [result] = await db.query(checkSubExist, [id]);

    if (result[0].count == 0) {
      return NextResponse.json({ message: "Id doesn't exist.", status: 404 });
    }

    // Delete the brand
    const deleteSub = `DELETE FROM subcategory WHERE id = ?`;
    await db.query(deleteSub, [id]);

    return NextResponse.json({
      status: 200,
      message: "Subcategory deleted successfully",
    });
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
    const { searchParams } = new URL(req.url);

    let page = parseInt(searchParams.get("page")) || 1;
    let limit = parseInt(searchParams.get("limit")) || 10;
    let offset = (page - 1) * limit;

    let status = searchParams.get("status");
    let search = searchParams.get("search");

    let whereClause = [];
    let values = [];

    if (status !== null && (status === "0" || status === "1")) {
      whereClause.push("status = ?");
      values.push(parseInt(status));
    }

    if (search) {
      whereClause.push("name LIKE ?");
      values.push(`%${search}%`);
    }

    let whereSQL = whereClause.length
      ? `WHERE ${whereClause.join(" AND ")}`
      : "";

    const getSubcategory = `SELECT * FROM subcategory ${whereSQL} ORDER BY id DESC LIMIT ? OFFSET ?`;

    values.push(limit, offset);
    const [subcategory] = await db.query(getSubcategory, values);

    const countQuery = `SELECT COUNT(*) AS total FROM subcategory ${whereSQL}`;
    const [countResult] = await db.query(countQuery, values.slice(0, -2)); // Last 2 params limit/offset hata rahe hain

    const total = countResult[0]?.total || 0;

    return NextResponse.json({
      status: true,
      data: subcategory,
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
