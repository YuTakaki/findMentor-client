import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authResponseType, authSlicerStateType, userType } from "../../types/types";
import { loginAction, registerAction, verifyTokenAction } from "../actions/authActions";

const initialState : authSlicerStateType = {
  loading: false,
  user: {},
  is_auth: null,
}

const authPendingBuilder = (state : authSlicerStateType) => {
  state.loading = true;
}

const authFulfilledBuilder = (state : authSlicerStateType, action : PayloadAction<authResponseType>) => {
  const payload = action.payload!
  state.loading = false;
  state.user = payload.user;
  state.is_auth = true;
}

const authRejectedBuilder = (state : authSlicerStateType) => {
  state.loading = false;
  state.is_auth = false;
}

const authSlicers = createSlice({
  name: "auth",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, authPendingBuilder);
    builder.addCase(loginAction.fulfilled, authFulfilledBuilder);
    builder.addCase(loginAction.rejected, authRejectedBuilder);

    //register
    builder.addCase(registerAction.pending, authPendingBuilder);
    builder.addCase(registerAction.fulfilled, authFulfilledBuilder);
    builder.addCase(registerAction.rejected, authRejectedBuilder);

    //register
    builder.addCase(verifyTokenAction.pending, authPendingBuilder);
    builder.addCase(verifyTokenAction.fulfilled, authFulfilledBuilder);
    builder.addCase(verifyTokenAction.rejected, authRejectedBuilder);
  }
});

export const authReducer = authSlicers.reducer