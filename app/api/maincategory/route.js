import supabase from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Required brand name." },
        { status: 400 }
      );
    }

    // Check if category already exists
    const { data: existing, error: checkError } = await supabase
      .from("maincategory")
      .select("id")
      .eq("name", name)
      .limit(1);

    if (checkError) {
      console.error("Supabase select error:", checkError);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "This category already exists." },
        { status: 400 }
      );
    }

    // Insert new category
    const { error: insertError } = await supabase
      .from("maincategory")
      .insert([{ name }]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Brand created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Product id required." },
        { status: 400 }
      );
    }

    // Check if category exists
    const { data: existing, error: checkError } = await supabase
      .from("maincategory")
      .select("id")
      .eq("id", id)
      .limit(1);

    if (checkError) {
      console.error("Supabase select error:", checkError);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }

    if (existing.length === 0) {
      return NextResponse.json(
        { message: "Id doesn't exist." },
        { status: 404 }
      );
    }

    // Delete category
    const { error: deleteError } = await supabase
      .from("maincategory")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        message: "Brand deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
