import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const productsApi = createApi({
  reducerPath: "productsApi", // Reducer Path
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEB_URL, // API Base URL
  }),
  endpoints: (builder) => ({
    // Fetch brands with pagination
    getCreateProductData: builder.query({
      query: (type) => ({
        url: "/api/products",
        method: "GET",
        params: { type },
      }),
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: `/api/products`,
        method: "POST",
        body: {
          product, // ✅ Pass the entire product object
        },
        headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
      }),
    }),
  }),
});

// Export the auto-generated hooks
export const { useAddProductMutation, useGetCreateProductDataQuery } =
  productsApi;
