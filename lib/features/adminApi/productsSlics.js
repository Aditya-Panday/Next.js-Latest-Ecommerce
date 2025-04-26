import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const productsApi = createApi({
  reducerPath: "productsApi", // Reducer Path
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEB_URL, // API Base URL
  }),
  tagTypes: ["ProductsData"],
  endpoints: (builder) => ({
    getCreateProductData: builder.query({
      query: ({
        type = "",
        id = "",
        status = "",
        stock = "",
        page = "1",
        limit = "10",
      }) => ({
        url: "/api/admin/products",
        method: "GET",
        params: { type, id, status, stock, page, limit },
      }),
      providesTags: ["ProductsData"],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: `/api/admin/products`,
        method: "POST",
        body: {
          ...product, // ✅ Pass the entire product object
        },
        headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
      }),
    }),
  }),
});

// Export the auto-generated hooks
export const { useAddProductMutation, useGetCreateProductDataQuery } =
  productsApi;
