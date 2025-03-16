import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const subcategoryApi = createApi({
  reducerPath: "subcategoryApi", // Reducer Path
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEB_URL, // API Base URL
  }),
  tagTypes: ["Subcategory"], // Define tag types
  endpoints: (builder) => ({
    // Fetch brands with pagination
    getSubcategory: builder.query({
      query: ({ page = 1, limit = 10, status = null, search = "" }) => ({
        // Send status when value will be available
        url: "/api/subcategory",
        method: "GET",
        params: { page, limit, status, search },
      }),
      providesTags: ["Subcategory"], // ✅ Attach tags to this query
    }),
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `/api/subcategory`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Subcategory"], // Refetch Subcategory after delete
    }),
    addSubcategory: builder.mutation({
      query: (name) => ({
        url: `/api/subcategory`,
        method: "POST",
        body: { name },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Subcategory"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useAddSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetSubcategoryQuery,
} = subcategoryApi;
