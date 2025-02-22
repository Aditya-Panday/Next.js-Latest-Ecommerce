import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, message, star, pic } = await req.json();

    // Validate required fields
    if (!name || !message || !star || !pic || star < 1 || star > 5) {
      return NextResponse.json({
        message: "All fields are required, and star must be between 1 and 5.",
        status: 400,
      });
    }

    const createTestimonial = `INSERT INTO testimonials (name, message, star, pic) VALUES (?,?,?,?)`;
    await db.query(createTestimonial, [name, message, star, pic]);

    return NextResponse.json({
      status: 200,
      message: "Thanks for feedback.",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An internal server error occurred",
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json({
        message: "Testimonial id required.",
        status: 400,
      });
    }

    const checkTestimonial = `SELECT COUNT(*) AS count FROM testimonials WHERE id = ?`;
    const [result] = await db.query(checkTestimonial, [id]);

    if (result[0].count === 0) {
      return NextResponse.json(
        { message: "Testimonial doesn't exist." },
        { status: 404 }
      );
    }
    const deleteTestimonial = `DELETE FROM testimonials WHERE id = ?`;
    await db.query(deleteTestimonial, [id]);

    return NextResponse.json({
      status: 200,
      message: "Testimonial deleted successfully",
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
