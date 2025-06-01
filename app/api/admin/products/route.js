import { z } from "zod";
import { NextResponse } from "next/server";
import { productSchema } from "@/utils/zodSchemas";
import supabase from "@/utils/supabaseClient";

// POST /api/products - Create a new product
export async function POST(req) {
  try {
    const body = await req.json();
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

    // Check if product name already exists
    const { data: existingProduct, error: existingError } = await supabase
      .from("products")
      .select("product_id")
      .eq("product_name", product_name)
      .maybeSingle();

    if (existingError) throw existingError;

    if (existingProduct) {
      return NextResponse.json(
        { message: "This product name already exists." },
        { status: 409 }
      );
    }

    const final_price = price - (price * discount) / 100;

    const { error: insertError } = await supabase.from("products").insert([
      {
        product_name,
        description,
        price,
        discount,
        final_price,
        brand_name,
        image_url,
        category_name,
        sub_category,
        sizes,
        colors,
        status,
      },
    ]);

    if (insertError) throw insertError;

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

    console.error("Supabase POST error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET /api/products?type=createData or type=getProducts
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "createData") {
      return await createProductData();
    }

    if (type === "getProducts") {
      return await productsData(req);
    }

    return NextResponse.json({ error: "Invalid API type" }, { status: 400 });
  } catch (error) {
    console.error("Supabase GET error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

// Function: Fetch brand and subcategory data
const createProductData = async () => {
  try {
    const { data: brands, error: brandErr } = await supabase
      .from("brands")
      .select("name")
      .eq("status", 1);

    const { data: subCategories, error: subCatErr } = await supabase
      .from("subcategory")
      .select("name")
      .eq("status", 1);

    if (brandErr || subCatErr) throw brandErr || subCatErr;

    return NextResponse.json({ brands, subCategories }, { status: 200 });
  } catch (error) {
    console.error("createProductData error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
};

// Function: Get products with optional filters and pagination
const productsData = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const id = searchParams.get("id");
    const status = searchParams.get("status");
    const stock = searchParams.get("stock");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    let query = supabase.from("products").select("*", { count: "exact" });

    if (id) query = query.ilike("product_id", `${id}%`);
    if (status) query = query.eq("status", status);
    if (stock) query = query.eq("stocks", stock);

    query = query.order("product_id", { ascending: false }).range(offset, offset + limit - 1);

    const { data: products, error, count } = await query;

    if (error) throw error;

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json(
      {
        success: true,
        products,
        pagination: {
          total: count,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("productsData error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
};
