import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "currentMenu",
  initialState: {
    active: true,
    width: "",
  },
  reducers: {
    activeMenu: (state, action) => {
      state.active = action.payload;
    },
    addWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { activeMenu, addWidth } = menuSlice.actions;
export default menuSlice;
