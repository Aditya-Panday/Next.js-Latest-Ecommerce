import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, message, star, pic } = await req.json();

    if (!name || !message || !star || !pic || star < 1 || star > 5) {
      return NextResponse.json(
        { message: "All fields are required, and star must be between 1 and 5." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("testimonials")
      .insert([{ name, message, star, pic }]);

    if (error) throw error;

    return NextResponse.json({ status: 200, message: "Thanks for feedback." });
  } catch (error) {
    console.error("POST Error:", error);
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

    if (!id) {
      return NextResponse.json(
        { message: "Testimonial ID required." },
        { status: 400 }
      );
    }

    const { data, error: fetchError } = await supabase
      .from("testimonials")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !data) {
      return NextResponse.json(
        { message: "Testimonial doesn't exist." },
        { status: 404 }
      );
    }

    const { error: deleteError } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      status: 200,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
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

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const { count, error: countError } = await supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    return NextResponse.json({
      status: true,
      data,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
