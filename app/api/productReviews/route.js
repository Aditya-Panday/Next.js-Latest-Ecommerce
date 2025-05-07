import db from "@/utils/db";
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
        // Check if the product exists
        const checkProductQuery = `SELECT product_id FROM products WHERE product_id = ?`;
        const [product] = await db.query(checkProductQuery, [productId]);

        if (!product || product.length === 0) {
            return NextResponse.json(
                { error: "This product was not found or productId is invalid." },
                { status: 404 }
            );
        }

        // Add the review
        const addReview = `INSERT INTO product_reviews (product_id, stars, description, name) VALUES (?, ?, ?, ?)`;
        await db.query(addReview, [productId, stars, description, name]);

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error.",
            },
            { status: 500 }
        );
    }
}
