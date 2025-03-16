import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEB_URL, // API Base URL
  }),
  tagTypes: ["Testimonial"], // Define tag types
  endpoints: (builder) => ({
    // Fetch brands with pagination
    getTestimonial: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        // Send status when value will be available
        url: "/api/testimonials",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Testimonial"], // ✅ Attach tags to this query
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/api/testimonials`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Testimonial"], // Refetch Subcategory after delete
    }),
    addTestimonial: builder.mutation({
      query: (name) => ({
        url: `/api/testimonials`,
        method: "POST",
        body: { name, message, rating, pic },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialQuery,
} = testimonialApi;
