import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { productId, stars, description, name } = await req.json();

  if (!productId || !stars || !description || !name) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    // 1. Check if product exists
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("product_id")
      .eq("product_id", productId)
      .single(); // Expecting one product
    console.log("product", product);
    
    if (productError) {
      if (productError.code === "PGRST116") {
        // "No rows found" for single()
        return NextResponse.json(
          { error: "This product was not found or productId is invalid." },
          { status: 404 }
        );
      }

      console.error("Supabase product check error:", productError);
      return NextResponse.json(
        { error: "Internal server error." },
        { status: 500 }
      );
    }

    // 2. Insert review
    const { error: insertError } = await supabase
      .from("product_reviews")
      .insert([
        {
          product_id: productId,
          stars,
          description,
          name,
        },
      ]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to add review." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
