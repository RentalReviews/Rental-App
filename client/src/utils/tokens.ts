import jwt_decode from "jwt-decode";

import type { JwtPayload } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

interface REFRESH_API_JSON {
  token: string;
  refreshToken: string;
}

const isTokenExpired = (token: string) => {
  const decoded: JwtPayload = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp && decoded.exp < currentTime;
};

/**
 * Extract user's auth token and refresh token
 * - If the auth token is expired, it will request a new one, and update the BEARER_TOKEN in localStorage
 * - If the refresh token is expired, it will remove the REFRESH_TOKEN and BEARER_TOKEN from localStorage
 *  and send a request to the server to invalidate the refresh token, forcing the user to log in again
 *
 */
const getTokens = async (): Promise<{ refreshToken: string; bearerToken: string }> => {
  const refreshToken = localStorage.getItem("REFRESH_TOKEN") || "";
  const bearerToken = localStorage.getItem("BEARER_TOKEN") || "";

  if (!refreshToken || !bearerToken) {
    return {
      refreshToken: "",
      bearerToken: "",
    };
  }

  // User refresh token is expired, needs to log in again
  if (isTokenExpired(refreshToken)) {
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("BEARER_TOKEN");

    fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    return {
      refreshToken: "",
      bearerToken: "",
    };
  }

  // All tokens are valid, return them
  if (!isTokenExpired(bearerToken)) {
    return {
      refreshToken,
      bearerToken,
    };
  }

  // User auth token is expired, but refresh token is still valid, request a new auth token
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const json = await response.json();

  if (response.ok) {
    localStorage.setItem("BEARER_TOKEN", (json as REFRESH_API_JSON).token);
    localStorage.setItem("REFRESH_TOKEN", (json as REFRESH_API_JSON).refreshToken);

    return {
      refreshToken: (json as REFRESH_API_JSON).refreshToken,
      bearerToken: (json as REFRESH_API_JSON).token,
    };
  } else {
    console.log("Error refreshing token: ", json.message);
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("BEARER_TOKEN");

    return {
      refreshToken: "",
      bearerToken: "",
    };
  }
};

export { getTokens };
