import { createSlice } from "@reduxjs/toolkit";

const initialState = 'light' as 'dark' | 'light'
const themeSlicers = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeAction : (state) => {
      return state === 'light' ? 'dark' : 'light'
    }
  }
});

export const {
  changeThemeAction,

} = themeSlicers.actions;
export const themeReducer = themeSlicers.reducer;
