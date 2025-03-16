import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter";
import { brandsApi } from "./features/adminApi/brandSlice";
import { subcategoryApi } from "./features/adminApi/subcategorySlice";
import { testimonialApi } from "./features/adminApi/testimonialSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer, // Assign Reducer correctly
      [brandsApi.reducerPath]: brandsApi.reducer, // Add the RTK Query reducer
      [subcategoryApi.reducerPath]: subcategoryApi.reducer,
      [testimonialApi.reducerPath]: testimonialApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        brandsApi.middleware,
        subcategoryApi.middleware,
        testimonialApi.middleware
      ), // Add RTK Query middleware
  });
};
