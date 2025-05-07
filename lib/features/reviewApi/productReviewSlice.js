import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const reviewApi = createApi({
  reducerPath: "reviewApi", // Reducer Path
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEB_URL,
  }),
  tagTypes: ["Review"], // Define tag types
  endpoints: (builder) => ({
    // Fetch brands with pagination
    getReview: builder.query({
      query: ({ id = "" }) => ({
        url: "/api/productReviews",
        method: "GET",
        params: { id },
      }),
      providesTags: ["Review"],
    }),
    addReview: builder.mutation({
      query: ({ productId, stars, description, name }) => ({
        url: `/api/productReviews`,
        method: "POST",
        body: { productId, stars, description, name }, // ✅ Send name in body instead of params
        headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON format
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewQuery } = reviewApi;
