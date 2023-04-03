import { createSlice } from "@reduxjs/toolkit";
import { getTokens } from "utils/tokens";
import jwt_decode from "jwt-decode";

import type { JwtPayload } from "types";

interface UserState {
  user?: {
    id: string;
    displayName: string;
    email: string;
    refreshToken: string;
    bearerToken: string;
  } | null;
}

const { refreshToken, bearerToken } = await getTokens();

const initialState: UserState = {
  user: null,
};

if (refreshToken && bearerToken) {
  const { displayName, email, id } = jwt_decode(bearerToken) as JwtPayload;

  initialState.user = {
    ...{
      id,
      displayName,
      email,
    },
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
