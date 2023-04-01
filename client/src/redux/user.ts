import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user?: {
    id: string;
    displayName: string;
    email: string;
    refreshToken: string;
    bearerToken: string;
  } | null;
}

const userInfo = JSON.parse(localStorage.getItem("USER") || "{}");
const refreshToken = localStorage.getItem("REFRESH_TOKEN");
const bearerToken = localStorage.getItem("BEARER_TOKEN");

const initialState: UserState = {
  user: null,
};

if (userInfo && refreshToken && bearerToken) {
  initialState.user = {
    ...userInfo,
    refreshToken: refreshToken,
    bearerToken: bearerToken,
  };
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const userSelector = (state: { user: UserState }) => state.user;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
