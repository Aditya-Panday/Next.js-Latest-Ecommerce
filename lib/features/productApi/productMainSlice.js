import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const productsMainApi = createApi({
    reducerPath: "productsMainApi", // Reducer Path
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_WEB_URL, // API Base URL
    }),
    tagTypes: ["ProductsMainData"],
    endpoints: (builder) => ({
        getMainProductData: builder.query({
            query: ({
                category = "",
                brand = "",
                sub = "",
                price = "",
                search = "",
                page = "1",
                limit = "10",
                productId = ""
            }) => ({
                url: "/api/products",
                method: "GET",
                params: { category, brand, sub, price, search, page, limit, productId },
            }),
            providesTags: ["ProductsMainData"],
        }),
    }),
});

export const { useGetMainProductDataQuery } = productsMainApi;


// Use like this..

// const { data, isLoading } = useGetCreateProductDataQuery({
//     category: "male,female",
//     brand: "Nike",
//     page: 1,
//     limit: 10,
//     sort: "price_desc", // or "price_asc"
// });
