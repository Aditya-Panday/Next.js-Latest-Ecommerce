import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter";
import { brandsApi } from "./features/adminApi/brandSlice";
import { subcategoryApi } from "./features/adminApi/subcategorySlice";
import { testimonialApi } from "./features/adminApi/testimonialSlice";
import { subscriberApi } from "./features/adminApi/subscriberSlice";
import { productsApi } from "./features/adminApi/productsSlics";
import { s3Api } from "./features/s3Api/s3Slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer, // Assign Reducer correctly
      [brandsApi.reducerPath]: brandsApi.reducer, // Add the RTK Query reducer
      [subcategoryApi.reducerPath]: subcategoryApi.reducer,
      [testimonialApi.reducerPath]: testimonialApi.reducer,
      [subscriberApi.reducerPath]: subscriberApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [s3Api.reducerPath]: s3Api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        brandsApi.middleware,
        subcategoryApi.middleware,
        testimonialApi.middleware,
        subscriberApi.middleware,
        productsApi.middleware,
        s3Api.middleware
      ), // Add RTK Query middleware
  });
};
