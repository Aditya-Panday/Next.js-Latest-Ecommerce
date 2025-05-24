// import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {}

export async function DELETE(req) {}

export async function GET(req) {}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
