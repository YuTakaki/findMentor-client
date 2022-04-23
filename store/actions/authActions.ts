import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get, post } from "../../services/request";
import { loginFormTypes, registerFormTypes, step1FormType } from "../../types/types";

export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async (data : loginFormTypes, { rejectWithValue }) => {
    try {
      const loginRequest = await post(`/api/auth/login`, data);
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
      const registerRequest = await post(`${NEXT_PUBLIC_SERVER}/api/auth/register`, data);
      return registerRequest.data
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log(error.response!.data)
        return rejectWithValue(error.response!.data);
      }
    }
  }
);

export const verifyTokenAction = createAsyncThunk(
  'auth/verifyTokenAction',
  async (_, { rejectWithValue }) => {
    try {
      const verifyTokenRequest = await get(`/api/auth/verify`);
      return verifyTokenRequest.data;
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log(error.response!.data)
        return rejectWithValue(error.response!.data);
      }
    }
  }
)

export const logoutAction = createAsyncThunk(
  'auth/logoutAction',
  async (_, { rejectWithValue }) => {
    try {
      await post(`/api/auth/logout`);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log(error.response!.data)
        return rejectWithValue(error.response!.data);
      }
    }
  }
)

export const addAdditionalInfoAction = createAsyncThunk(
  'auth/addAdditionalInfoAction',
  async (data : step1FormType | { pay_rate : number | '' }) => {
    try {
      let uploadData = new FormData();
      if (!('pay_rate' in data)) {
        uploadData.append('profile_img', data.profile_img);
        uploadData.append('job_position', data.job_position);
        uploadData.append('bio', data.bio) 
      }
      const data_to_send = 'pay_rate' in data ? data : uploadData;
      const saveUserInfo = await post(`/api/auth/additional`, data_to_send);
      return saveUserInfo.data.user;
    } catch (error) {
      console.log(error);
    }
  }
)