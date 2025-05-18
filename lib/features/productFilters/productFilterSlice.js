import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsFilterApi = createApi({
  reducerPath: "productsFilterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEB_URL,
  }),
  endpoints: (builder) => ({
    getFiltersData: builder.query({
      query: () => "/api/productFilters",
    }),
  }),
});

export const { useGetFiltersDataQuery } = productsFilterApi;
