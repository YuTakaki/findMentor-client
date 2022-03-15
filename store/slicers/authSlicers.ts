import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/authActions";

const initialState = {
  loading: false,
  auth: {},
  is_auth: null,
}
const authSlicers = createSlice({
  name: "auth",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, (state, action) => {

    });
    builder.addCase(loginAction.fulfilled, (state, action) => {

    });
  }
});

export const authReducer = authSlicers.reducer