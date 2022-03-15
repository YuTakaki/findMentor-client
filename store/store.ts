import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slicers/authSlicers";

export const store = configureStore({
  reducer: {
    authReducer
  }
});