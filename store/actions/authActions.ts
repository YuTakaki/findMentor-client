import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { NEXT_PUBLIC_SERVER } = process.env;
export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async (data, { rejectWithValue }) => {
    try {
      const loginRequest = await axios.post(`${NEXT_PUBLIC_SERVER}/api/auth/login`, data);
      console.log(loginRequest.data);
    } catch (error) {
      if (axios.isAxiosError(error)){
        return rejectWithValue(error.response!.data.error);
      }
    }
  }
);