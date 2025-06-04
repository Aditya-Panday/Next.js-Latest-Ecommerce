import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter";
import { brandsApi } from "./features/adminApi/brandSlice";
import { subcategoryApi } from "./features/adminApi/subcategorySlice";
import { testimonialApi } from "./features/adminApi/testimonialSlice";
import { subscriberApi } from "./features/adminApi/subscriberSlice";
import { productsApi } from "./features/adminApi/productsSlics";
import { productsMainApi } from "./features/productApi/productMainSlice";
import { reviewApi } from "./features/reviewApi/productReviewSlice";
import { productsFilterApi } from "./features/productFilters/productFilterSlice";
import cartReducer from "./features/cartData/cartSlice";
import mountedReducer from "./features/mounted/mountedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer, // Assign Reducer correctly
      [brandsApi.reducerPath]: brandsApi.reducer, // Add the RTK Query reducer
      [subcategoryApi.reducerPath]: subcategoryApi.reducer,
      [testimonialApi.reducerPath]: testimonialApi.reducer,
      [subscriberApi.reducerPath]: subscriberApi.reducer,
      [productsApi.reducerPath]: productsApi.reducer,
      [productsMainApi.reducerPath]: productsMainApi.reducer,
      [reviewApi.reducerPath]: reviewApi.reducer,
      [productsFilterApi.reducerPath]: productsFilterApi.reducer,
      cart: cartReducer,
      mounted: mountedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        brandsApi.middleware,
        subcategoryApi.middleware,
        testimonialApi.middleware,
        subscriberApi.middleware,
        productsApi.middleware,
        productsMainApi.middleware,
        reviewApi.middleware,
        productsFilterApi.middleware
      ), // Add RTK Query middleware
  });
};
