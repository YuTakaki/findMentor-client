import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slicers/authSlicers";
import { themeReducer } from "./slicers/themeSlicers";

export const store = configureStore({
  reducer: {
    authReducer,
    themeReducer,
  }
});