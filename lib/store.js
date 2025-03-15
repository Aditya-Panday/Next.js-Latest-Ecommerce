import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter"; // Use Default export
import { todosApi } from "./features/api/userSlice";
import { brandsApi } from "./features/adminApi/brandSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer, // Assign Reducer correctly
      [todosApi.reducerPath]: todosApi.reducer, // Add the RTK Query reducer
      [brandsApi.reducerPath]: brandsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware, brandsApi.middleware), // Add RTK Query middleware
  });
};
