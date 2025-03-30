import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const s3Api = createApi({
  reducerPath: "s3Api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEB_URL,
  }),
  endpoints: (builder) => ({
    s3MultipartUpload: builder.mutation({
      query: ({ action, data }) => ({
        url: `/api/s3`,
        method: "POST",
        body: { action, data },
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useS3MultipartUploadMutation } = s3Api;
