import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const brandsApi = createApi({
  reducerPath: "brandsApi", // Reducer Path
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEB_URL, // API Base URL
  }),
  tagTypes: ["Brands"], // Define tag types
  endpoints: (builder) => ({
    // Fetch brands with pagination
    getBrands: builder.query({
      query: ({ page = 1, limit = 10, status = null, search = "" }) => ({
        url: "/api/brands",
        method: "GET",
        params: { page, limit, status, search },
      }),
      providesTags: ["Brands"], // ✅ Attach tags to this query
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/api/brands`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Brands"], // Refetch brands after delete
    }),
    addBrand: builder.mutation({
      query: (name) => ({
        url: `/api/brands`,
        method: "POST",
        body: { name }, // ✅ Send name in body instead of params
        headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
      }),
      invalidatesTags: ["Brands"], // Refetch brands after add
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useAddBrandMutation,
} = brandsApi;
