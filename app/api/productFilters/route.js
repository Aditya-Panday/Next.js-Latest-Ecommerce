import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET() {
  try {
    // Fetch distinct category_name, sub_category, brand_name from 'products' table in parallel
    const [categoriesRes, subCategoriesRes, brandsRes] = await Promise.all([
      supabase.from("products").select("category_name", { count: "exact" }),
      supabase.from("products").select("sub_category", { count: "exact" }),
      supabase.from("products").select("brand_name", { count: "exact" }),
    ]);

    // Check for errors
    if (categoriesRes.error || subCategoriesRes.error || brandsRes.error) {
      console.error("Supabase query errors:", categoriesRes.error, subCategoriesRes.error, brandsRes.error);
      return NextResponse.json({ message: "Error fetching filter data" }, { status: 500 });
    }

    // Extract unique values using Set (because Supabase doesn't support DISTINCT directly)
    const categories = [
      ...new Set(categoriesRes.data.map((row) => row.category_name).filter(Boolean)),
    ];
    const subCategories = [
      ...new Set(subCategoriesRes.data.map((row) => row.sub_category).filter(Boolean)),
    ];
    const brands = [
      ...new Set(brandsRes.data.map((row) => row.brand_name).filter(Boolean)),
    ];

    return NextResponse.json({
      status: 200,
      data: {
        categories,
        subCategories,
        brands,
      },
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
