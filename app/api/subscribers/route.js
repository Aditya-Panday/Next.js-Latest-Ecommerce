import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { status: false, message: "Invalid or missing email." },
        { status: 400 }
      );
    }

    // ✅ Check if email already exists
    const { data: existing, error: existError } = await supabase
      .from("subscribers")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { status: false, message: "This email is already subscribed." },
        { status: 400 }
      );
    }

    // ✅ Insert new subscriber
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (insertError) throw insertError;

    return NextResponse.json(
      { status: true, message: "Thanks for subscribing." },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { status: false, message: "Server error. Please try again later." },
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

    const { data, count, error } = await supabase
      .from("subscribers")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      status: true,
      data,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { status: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
