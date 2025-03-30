import db from "@/utils/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/constants/constantFunc";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const validatedData = productSchema.parse(body);

    const {
      product_name,
      description,
      price,
      discount,
      brand_name,
      image_url,
      category_name,
      sub_category,
      sizes,
      colors,
      status,
    } = validatedData;

    // Check if product already exists (optimized query)
    const checkQuery = `SELECT COUNT(*) AS count FROM products WHERE product_name = ?`;
    const [result] = await db.query(checkQuery, [product_name]);
    console.log(result);
    if (result[0].count !== 0) {
      return NextResponse.json({
        message: "This product name already exists.",
        status: 404,
      });
    }

    const final_price = price - (price * discount) / 100;

    // Insert the new product securely (avoid SQL injection)
    const insertQuery = `
      INSERT INTO products 
      (product_name, description, price, discount,final_price, brand_name, image_url, category_name, sub_category, sizes, colors, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(insertQuery, [
      product_name,
      description,
      price,
      discount,
      final_price,
      brand_name,
      image_url,
      category_name,
      sub_category,
      JSON.stringify(sizes), // Convert array to JSON string
      JSON.stringify(colors),
      status,
    ]);

    return NextResponse.json(
      { success: true, message: "Product created successfully." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

const createProductData = async () => {
  try {
    const [brands] = await db.query("SELECT name FROM brands WHERE status = 1");
    const [subCategories] = await db.query(
      "SELECT name FROM subcategory WHERE status = 1"
    );
    return NextResponse.json({ brands, subCategories }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
};

const functionHandlers = {
  createData: createProductData, // Mapping function to the request type
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type in functionHandlers) {
      return await functionHandlers[type](); // Call the corresponding function
    }

    return NextResponse.json({ error: "Invalid API type" }, { status: 400 });
  } catch (error) {
    console.error("GET Request Error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
