import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LOGIN_URL = "/api/login";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk("login/loginser", async (serData) => {
  const response = await axios.post(LOGIN_URL, { ...serData });
  window.localStorage.setItem(
    "loggedECommerceAppser",
    JSON.stringify({ ...response.data })
  );
  return response.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    alreadyLogged: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export function selectLoggedUser(state) {
  return state.login.user;
}

export function selectLoginLoading(state) {
  return state.login.loading;
}

export function selectLoginError(state) {
  return state.login.error;
}

export const { alreadyLogged, logout } = loginSlice.actions;

export default loginSlice.reducer;
