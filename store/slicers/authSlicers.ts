import { createSlice } from "@reduxjs/toolkit";
import { authResponseType, authSlicerStateType, userType } from "../../types/types";
import { loginAction, registerAction } from "../actions/authActions";


const initialState : authSlicerStateType = {
  loading: false,
  user: {},
  is_auth: null,
}
const authSlicers = createSlice({
  name: "auth",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const payload : authResponseType = action.payload!
      state.loading = false;
      state.user = payload.user;
      state.is_auth = true;
      localStorage.setItem('find_mentor_token', payload.token)
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.loading = false;
      state.is_auth = false;
    });

    //register
    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      const payload : authResponseType = action.payload!
      state.loading = false;
      state.user = payload.user;
      state.is_auth = true;
      localStorage.setItem('find_mentor_token', payload.token);
    });
    builder.addCase(registerAction.rejected, (state) => {
      state.loading = false;
      state.is_auth = false;
    });
  }
});

export const authReducer = authSlicers.reducer