import { createSlice } from "@reduxjs/toolkit";
import jwt_decode, { JwtPayload } from "jwt-decode";

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

// check if the auth token is expired, if so, request a new one
if (bearerToken && refreshToken) {
  const decodedBearer: JwtPayload = jwt_decode(bearerToken);
  const decodedRefresh: JwtPayload = jwt_decode(refreshToken);
  const currentTime = Date.now() / 1000;

  if (decodedRefresh?.exp && decodedRefresh.exp < currentTime) {
    // refresh token is expired, user needs to log in again
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("BEARER_TOKEN");
    localStorage.removeItem("USER");
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  } else if (decodedBearer?.exp && decodedBearer?.exp < currentTime) {
    // auth token is expired, but refresh token is still valid, request a new auth token
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const { bearerToken } = await response.json();
      localStorage.setItem("BEARER_TOKEN", bearerToken);
    } else {
      console.log("Error refreshing token");
    }
  }
}

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
