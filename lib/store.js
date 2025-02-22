import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter"; // Use Default export
import { todosApi } from "./features/api/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer, // Assign Reducer correctly
      [todosApi.reducerPath]: todosApi.reducer, // Add the RTK Query reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware), // Add RTK Query middleware
  });
};
