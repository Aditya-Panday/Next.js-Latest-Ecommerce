import supabase from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const productId = searchParams.get("productId");
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const subParam = searchParams.get("sub");
  const sortParam = searchParams.get("price");
  const searchParam = searchParams.get("search");

  try {
    let query = supabase.from("products").select("*", { count: "exact" });

    // Apply filters
    if (productId) query = query.eq("product_id", productId);

    if (categoryParam) {
      const categories = categoryParam.split(",").filter(Boolean);
      if (categories.length === 1) {
        query = query.ilike("category_name", categories);
      } else if (categories.length > 1) {
        query = query.in("category_name", categories);
      }
    }

    if (subParam) {
      const subs = subParam.split(",").filter(Boolean);
      if (subs.length) {
        query = query.in("sub_category", subs);
      }
    }

    if (brandParam) {
      const brands = brandParam.split(",").filter(Boolean);
      if (brands.length) {
        query = query.in("brand_name", brands);
      }
    }

    if (searchParam) {
      query = query.ilike("product_name", `%${searchParam}%`);
    }

    // Sorting
    if (sortParam === "price_asc") {
      query = query.order("final_price", { ascending: true });
    } else if (sortParam === "price_desc") {
      query = query.order("final_price", { ascending: false });
    } else {
      query = query.order("product_id", { ascending: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: products, count, error } = await query;

    if (error) throw error;

    let relatedProducts = [];
    let productReview = [];

    if (productId) {
      const { data: currentProduct, error: prodErr } = await supabase
        .from("products")
        .select("sub_category, category_name")
        .eq("product_id", productId)
        .single();
        
      if (prodErr && prodErr.code !== "PGRST116") {
        // throw only if it's not "no row found"
        throw prodErr;
      }

      if (!currentProduct) {
        return NextResponse.json(
          {
            success: false,
            message: "Product not found.",
          },
          { status: 404 }
        );
      }
      if (currentProduct?.sub_category && currentProduct?.category_name) {
        const { data: related, error: relatedErr } = await supabase
          .from("products")
          .select("*")
          .eq("sub_category", currentProduct.sub_category)
          .eq("category_name", currentProduct.category_name)
          .neq("product_id", productId)
          .limit(4);

        if (relatedErr) throw relatedErr;

        relatedProducts = related;
      }

      const { data: reviews, error: reviewErr } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId);

      if (reviewErr) throw reviewErr;

      productReview = reviews;
    }

    return NextResponse.json(
      {
        success: true,
        products,
        pagination: {
          total: count || 0,
          page,
          limit,
          totalPages: Math.ceil((count || 0) / limit),
        },
        ...(productId && { relatedProducts, productReview }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Supabase Error:", error.message);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
