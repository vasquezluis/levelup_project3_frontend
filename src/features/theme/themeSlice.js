import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => !state,
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
