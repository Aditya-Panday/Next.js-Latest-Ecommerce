import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();

    // Validate required field
    if (!name) {
      return NextResponse.json(
        { message: "Subcategory name is required." },
        { status: 400 }
      );
    }

    // Check if subcategory name exists
    const { data: existingSubcategory, error: checkError } = await supabase
      .from("subcategory")
      .select("id")
      .eq("name", name)
      .single();

    if (existingSubcategory) {
      return NextResponse.json(
        { message: "This Subcategory name already exists." },
        { status: 400 }
      );
    }

    if (checkError && checkError.code !== "PGRST116") {
      // Handle any Supabase error that isn't "no rows found"
      console.error("Supabase check error:", checkError);
      return NextResponse.json(
        { message: "Failed to check existing subcategory." },
        { status: 500 }
      );
    }

    // Add the new subcategory
    const { error: insertError } = await supabase
      .from("subcategory")
      .insert([{ name }]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { message: "Failed to create subcategory." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Subcategory created successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));

    // Validate required field
    if (!id) {
      return NextResponse.json(
        { message: "Subcategory id required." },
        { status: 400 }
      );
    }

    // Check if subcategory exists
    const { data: existing, error: fetchError } = await supabase
      .from("subcategory")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Supabase fetch error:", fetchError);
      return NextResponse.json(
        { message: "Failed to check subcategory existence." },
        { status: 500 }
      );
    }

    if (!existing) {
      return NextResponse.json(
        { message: "Id doesn't exist." },
        { status: 404 }
      );
    }

    // Delete the subcategory
    const { error: deleteError } = await supabase
      .from("subcategory")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return NextResponse.json(
        { message: "Failed to delete subcategory." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = supabase.from("subcategory").select("*", { count: "exact" });

    // Apply filters
    if (status === "0" || status === "1") {
      query = query.eq("status", parseInt(status));
    }

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    // Apply ordering and pagination
    query = query.order("id", { ascending: false }).range(offset, offset + limit - 1);

    // Execute query
    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to fetch subcategories" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      data,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
