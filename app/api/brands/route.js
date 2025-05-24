import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Brand name is required." },
        { status: 400 }
      );
    }

    // Check if brand name exists
    let { data: existingBrands, error: selectError } = await supabase
      .from("brands")
      .select("id")
      .eq("name", name);

    if (selectError) {
      console.error(selectError);
      return NextResponse.json(
        { message: "Error checking brand name." },
        { status: 500 }
      );
    }

    if (existingBrands.length > 0) {
      return NextResponse.json(
        { message: "This Brand name already exists." },
        { status: 400 }
      );
    }

    // Insert new brand
    const { data, error: insertError } = await supabase
      .from("brands")
      .insert([{ name }]);

    if (insertError) {
      console.error(insertError);
      return NextResponse.json(
        { message: "Error inserting brand." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Brand created successfully",
      data,
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
    let id = parseInt(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "Brand id required." },
        { status: 400 }
      );
    }

    // Check if brand exists
    let { data: brand, error: selectError } = await supabase
      .from("brands")
      .select("id")
      .eq("id", id)
      .single();

    if (selectError) {
      return NextResponse.json(
        { message: "Id doesn't exist." },
        { status: 404 }
      );
    }

    // Delete brand
    const { error: deleteError } = await supabase
      .from("brands")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      return NextResponse.json(
        { message: "Error deleting brand." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    let page = parseInt(searchParams.get("page")) || 1;
    let limit = parseInt(searchParams.get("limit")) || 10;
    let status = searchParams.get("status");
    let search = searchParams.get("search");

    let query = supabase.from("brands").select("*", { count: "exact" });

    // Filters
    if (status === "0" || status === "1") {
      query = query.eq("status", parseInt(status));
    }

    if (search) {
      query = query.ilike("name", `%${search}%`); // case-insensitive LIKE
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order("id", { ascending: false });

    const { data, count, error } = await query;

    if (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error fetching brands." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: true,
      data,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
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
