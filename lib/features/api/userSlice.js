import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the API slice
export const todosApi = createApi({
  reducerPath: "api", // The path to the reducer in the store
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }), // Base API URL
  //   baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me/api/" }), // Base API URL
  endpoints: (builder) => ({
    // Mutation for adding a new todo
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
    }),
    // Fetch todos for reference
    getTodos: builder.query({
      query: () => "/todos",
    }),
  }),

  //Another example
  //   endpoints: (builder) => ({
  //     //endpoint baseurl isse pehle automatically use ho jayega.
  //     getRandomUsers: builder.query({
  //       //get request ke liye query use hota hai or baki sab ke liye mutation. or agar ye typescript hota toh result type or query type define krte like <string, string> builder.query ke baad
  //       query: (params) => `?page=${params.page}`,
  //     }),
  //   }),
});

// Export hooks for usage in functional components
export const { useAddTodoMutation, useGetTodosQuery } = todosApi;
// &results=${params.results}
