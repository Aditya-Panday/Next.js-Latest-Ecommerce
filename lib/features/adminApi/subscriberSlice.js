import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEB_URL,
  }),
  endpoints: (builder) => ({
    // Fetch brands with pagination
    getSubscriber: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/subscribers",
        method: "GET",
        params: { page, limit },
      }),
    }),
    addSubscriber: builder.mutation({
      query: (email) => ({
        url: `/api/subscribers`,
        method: "POST",
        body: { email },
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

// Export the auto-generated hooks
export const { useGetSubscriberQuery, useAddSubscriberMutation } =
  subscriberApi;
