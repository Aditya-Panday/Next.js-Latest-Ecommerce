import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { message: "Required brand name." },
        { status: 400 }
      );
    }

    // Check if brand name exists
    const checkBrand = `SELECT COUNT(*) AS count FROM brands WHERE name = ?`;
    const [result] = await db.query(checkBrand, [name]);

    if (result[0].count > 0) {
      return NextResponse.json(
        { message: "This Brand name already exists." },
        { status: 400 }
      );
    }

    // Add the new brand
    const addBrand = `INSERT INTO brands (name) VALUES (?)`;
    await db.query(addBrand, [name]);

    return NextResponse.json({
      status: true,
      message: "Brand created successfully",
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
    const { id } = await req.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json({
        message: "Product id required.",
        status: 400,
      });
    }

    // Check if brand exists
    const checkBrandExist = `SELECT COUNT(*) AS count FROM brands WHERE id = ?`;
    const [result] = await db.query(checkBrandExist, [id]);

    if (result[0].count == 0) {
      return NextResponse.json({ message: "Id doesn't exist.", status: 404 });
    }

    // Delete the brand
    const deleteBrand = `DELETE FROM brands WHERE id = ?`;
    await db.query(deleteBrand, [id]);

    return NextResponse.json({
      status: 200,
      message: "Brand deleted successfully",
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
