import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  const id = searchParams.get("productId"); // e.g. "#23".
  const categoryParam = searchParams.get("category"); // e.g. "male,female".
  const brandParam = searchParams.get("brand"); // e.g. "Nike,Adidas".
  const subParam = searchParams.get("sub"); // sort by subCategory.
  const sortParam = searchParams.get("price"); // sort by price.
  const searchParam = searchParams.get("search"); // Search by product name.
  const filters = [];
  const values = [];

  // Uses IN (?) clauses for flexible filtering.
  // Category filter (IN clause)
  if (categoryParam) {
    const categories = categoryParam.split(",");
    filters.push(`category_name  IN (${categories.map(() => "?").join(",")})`);
    values.push(...categories);
  }
  // Sub-Category filter (IN clause)
  if (subParam) {
    const sub_cat = subParam.split(",");
    filters.push(`sub_category IN (${sub_cat.map(() => "?").join(",")})`);
    values.push(...sub_cat);
  }
  // Brand filter (IN clause)
  if (brandParam) {
    const brands = brandParam.split(",");
    filters.push(`brand_name IN (${brands.map(() => "?").join(",")})`);
    values.push(...brands);
  }
  if (id) {
    filters.push(`product_id = ?`);
    values.push(id);
  }
  if (searchParam) {
    filters.push(`product_name LIKE ?`);
    values.push(`%${searchParam}%`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  console.log("whereclause", whereClause);
  // Default sort by product_id desc
  let orderByClause = "ORDER BY product_id DESC";

  if (sortParam === "price_asc") {
    orderByClause = "ORDER BY final_price ASC";
  } else if (sortParam === "price_desc") {
    orderByClause = "ORDER BY final_price DESC";
  }

  try {
    // Fetch paginated products
    const dataQuery = `SELECT * FROM products ${whereClause} ${orderByClause} LIMIT ? OFFSET ?`;
    console.log("query", dataQuery);
    const dataParams = [...values, limit, offset];
    const [products] = await db.query(dataQuery, dataParams);

    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) as total FROM products ${whereClause}`;
    const [countResult] = await db.query(countQuery, values);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);
    let relatedProducts = [];
    let productReview = [];

    if (id) {
      const [productRes] = await db.query(
        `SELECT sub_category, category_name FROM products WHERE product_id = ? `,
        [id]
      );
      console.log("produsctres", productRes);
      const subCategory = productRes[0]?.sub_category;
      const categoryName = productRes[0]?.category_name;

      if (subCategory) {
        const [relatedRes] = await db.query(
          `SELECT * FROM products WHERE (sub_category = ? AND category_name = ?) AND product_id != ?  LIMIT 4`,
          [subCategory, categoryName, id]
        );
        relatedProducts = relatedRes;
      }
      const [reviewRes] = await db.query(
        `SELECT * FROM product_reviews WHERE product_id = ?`,
        [id]
      );
      productReview = reviewRes;
    }

    return NextResponse.json(
      {
        success: true,
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
        ...(id && { relatedProducts, productReview }), // 👈 only include if `id` is truthy
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred.",
      },
      { status: 500 }
    );
  }
}

// import db from "@/utils/db";
// import { NextResponse } from "next/server";

// const parseList = (param) => param?.split(",") || [];

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const [page, limit] = [parseInt(searchParams.get("page") || "1", 10), parseInt(searchParams.get("limit") || "10", 10)];
//     const offset = (page - 1) * limit;

//     // Build filters dynamically
//     const filterMap = {
//       category: ["category_name", parseList(searchParams.get("category"))],
//       sub: ["sub_category", parseList(searchParams.get("sub"))],
//       brand: ["brand_name", parseList(searchParams.get("brand"))],
//     };

//     const filters = [];
//     const values = [];
//     Object.values(filterMap).forEach(([col, arr]) => {
//       if (arr.length) {
//         filters.push(`${col} IN (${arr.map(() => "?").join(",")})`);
//         values.push(...arr);
//       }
//     });

//     const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
//     const sort = searchParams.get("sort");
//     const order = sort === "price_asc" ? "price ASC" : sort === "price_desc" ? "price DESC" : "product_id DESC";

//     // Queries
//     const dataQuery = `SELECT * FROM products ${where} ORDER BY ${order} LIMIT ? OFFSET ?`;
//     const countQuery = `SELECT COUNT(*) as total FROM products ${where}`;
//     const [products] = await db.query(dataQuery, [...values, limit, offset]);
//     const [countResult] = await db.query(countQuery, values);

//     return NextResponse.json({
//       success: true,
//       products,
//       pagination: {
//         total: countResult[0]?.total || 0,
//         page,
//         limit,
//         totalPages: Math.ceil((countResult[0]?.total || 0) / limit),
//       },
//     });
//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
//   }
// }
