import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginFormTypes, registerFormTypes } from "../../types/types";

const { NEXT_PUBLIC_SERVER } = process.env;
export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async (data : loginFormTypes, { rejectWithValue }) => {
    try {
      const loginRequest = await axios.post(`${NEXT_PUBLIC_SERVER}/api/auth/login`, data);
      return loginRequest.data;
    } catch (error) {
      if (axios.isAxiosError(error)){
        return rejectWithValue(error.response!.data.error);
      }
    }
  }
);

export const registerAction = createAsyncThunk(
  'auth/registerAction',
  async (data : registerFormTypes, { rejectWithValue }) => {
    try {
      const registerRequest = await axios.post(`${NEXT_PUBLIC_SERVER}/api/auth/register`, data);
      return registerRequest.data
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log(error.response!.data)
        return rejectWithValue(error.response!.data);
      }
    }
  }
);