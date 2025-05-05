import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    const { productId, stars, description, name } = await req.json();;

    if (!productId || !stars || !description || !name) {
        return NextResponse.json(
            { error: 'All fields are required.' },
            { status: 400 }
        );
    }

    try {
        // Fetch paginated products
        const addReview = `INSERT INTO product_reviews (product_id, stars, description,name) VALUES (?,?,?,?)`;
        await db.query(addReview, [productId, stars, description]);

        return NextResponse.json({
            success: true,
        }, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({
            success: false,
            message: "An internal server error occurred.",
        }, { status: 500 });
    }
}
