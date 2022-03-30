import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authResponseType, authSlicerStateType, userType } from "../../types/types";
import { addAdditionalInfoAction, loginAction, registerAction, verifyTokenAction } from "../actions/authActions";

const initialState : authSlicerStateType = {
  loading: false,
  user: {},
  is_auth: null,
  error: null,
}

const authPendingBuilder = (state : authSlicerStateType) => {
  state.loading = true;
}

const authFulfilledBuilder = (state : authSlicerStateType, action : PayloadAction<authResponseType>) => {
  const payload = action.payload!
  state.loading = false;
  state.user = payload.user;
  state.is_auth = true;
  if (payload.error !== undefined) {
    state.error = payload.error
  }
}

const authRejectedBuilder = (state : authSlicerStateType) => {
  state.loading = false;
  state.is_auth = false;
}

const authSlicers = createSlice({
  name: "auth",
  initialState,
  reducers:{
    changeErrorAction: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, authPendingBuilder);
    builder.addCase(loginAction.fulfilled, authFulfilledBuilder);
    builder.addCase(loginAction.rejected, authRejectedBuilder);

    //register
    builder.addCase(registerAction.pending, authPendingBuilder);
    builder.addCase(registerAction.fulfilled, authFulfilledBuilder);
    builder.addCase(registerAction.rejected, authRejectedBuilder);

    //verify
    builder.addCase(verifyTokenAction.pending, authPendingBuilder);
    builder.addCase(verifyTokenAction.fulfilled, authFulfilledBuilder);
    builder.addCase(verifyTokenAction.rejected, authRejectedBuilder);

    builder.addCase(addAdditionalInfoAction.pending, authPendingBuilder);
    builder.addCase(addAdditionalInfoAction.fulfilled, (state, action) => {
      state.user = {
        ...action.payload,
        profile_img: `${process.env.NEXT_PUBLIC_SERVER}${action.payload.profile_img}`
      }
    });
  }
});

export const {
  changeErrorAction,
} = authSlicers.actions;
export const authReducer = authSlicers.reducer