import { configureStore } from "@reduxjs/toolkit";
import { tmdApi } from "./TMDB";
import categorySlice from "../features/categorySlice";
import menuSlice from "../features/menuSlice";

export const store = configureStore({
  reducer: {
    [tmdApi.reducerPath]: tmdApi.reducer,
    currentCategory: categorySlice.reducer,
    currentMenu: menuSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdApi.middleware),
});
