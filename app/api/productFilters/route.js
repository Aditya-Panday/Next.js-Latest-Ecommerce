import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Run all queries in parallel for better performance
    const [categories, subCategories, brands] = await Promise.all([
      db.query("SELECT DISTINCT category_name FROM products"),
      db.query("SELECT DISTINCT sub_category FROM products"),
      db.query("SELECT DISTINCT brand_name FROM products"),
    ]);

    return NextResponse.json({
      status: 200,
      data: {
        categories: categories[0].map((row) => row.category_name),
        subCategories: subCategories[0].map((row) => row.sub_category),
        brands: brands[0].map((row) => row.brand_name),
      },
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
