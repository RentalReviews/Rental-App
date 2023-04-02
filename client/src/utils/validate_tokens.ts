import jwt_decode from "jwt-decode";

import type { JwtPayload } from "types";

/**
 * handles validating the user's auth token and refresh token
 * if the auth token is expired, it will request a new one, and update the BEARER_TOKEN in localStorage
 * if the refresh token is expired, it will remove the REFRESH_TOKEN and BEARER_TOKEN from localStorage
 * and send a request to the server to invalidate the refresh token, forcing the user to log in again
 *
 * @param bearerToken user's auth token
 * @param refreshToken user's refresh token
 */
const validateTokens = async (bearerToken: string | null, refreshToken: string | null) => {
  // check if the auth token is expired, if so, request a new one
  if (bearerToken && refreshToken) {
    const decodedBearer: JwtPayload = jwt_decode(bearerToken);
    const decodedRefresh: JwtPayload = jwt_decode(refreshToken);
    const currentTime = Date.now() / 1000;

    if (decodedRefresh?.exp && decodedRefresh.exp < currentTime) {
      // refresh token is expired, user needs to log in again
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("BEARER_TOKEN");
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
};

export { validateTokens };
