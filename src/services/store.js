import { configureStore } from "@reduxjs/toolkit";
import { tmdApi } from "./TMDB";
import categorySlice from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    [tmdApi.reducerPath]: tmdApi.reducer,
    currentCategory: categorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdApi.middleware),
});
