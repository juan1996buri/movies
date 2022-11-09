import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "currentCategory",
  initialState: {
    categoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectCategory: (state, action) => {
      state.searchQuery = "";
      state.categoryName = action.payload;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { searchMovie, selectCategory } = categorySlice.actions;
export default categorySlice;
