import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: cookies.get("nfcToken"),
    user_id: cookies.get("nfcUid"),
    userData: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    },
    setAuth: (state, { payload }) => {
      state.token = payload.token;
      state.user_id = payload.user_id;
    },
    setUser: (state, { payload }) => {
      state.userData = payload;
    },
  },
});
export const { clearState, setAuth, setUser } = appSlice.actions;
export const appSelector = (state) => state.app;
