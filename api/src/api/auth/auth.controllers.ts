import { v4 as uuid } from "uuid";
import { compare as bcryptCompare } from "bcrypt";
import { verify as jwtVerify } from "jsonwebtoken";

import { generateTokens } from "utils/jwt";
import { getUserByEmail, createUser, getUserById } from "api/users/users.services";
import {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  revokeRefreshToken,
  revokeRefreshTokensByUserId,
} from "api/auth/auth.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "utils/jwt";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      throw new HttpError("Missing required fields", 400);
    }

    if (!emailRegex.test(email)) {
      throw new HttpError("Invalid email address", 400);
    }

    const user = await getUserByEmail(email);
    if (user) {
      throw new HttpError("Email already registered", 400);
    }

    const { newUser, newProfile } = await createUser(email, password, displayName);
    const jti = uuid();
    const { token, refreshToken } = generateTokens(newUser, jti);
    await addRefreshTokenToWhitelist(jti, refreshToken, newUser.id);

    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
        profile: {
          id: newProfile.id,
        },
      },
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new HttpError("Missing required fields", 400);
    }

    const user = await getUserByEmail(email);
    if (!user) {
      throw new HttpError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcryptCompare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpError("Invalid credentials", 401);
    }

    const jti = uuid();
    const { token, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist(jti, refreshToken, user.id);

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new HttpError("Missing required fields", 400);
    }

    const payload = jwtVerify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as
      | string
      | JwtPayload;

    if (typeof payload !== "object" || !payload.jti || !payload.id) {
      throw new HttpError("Unauthorized", 401);
    }

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked) {
      throw new HttpError("Unauthorized", 401);
    }

    const user = await getUserById(payload.id);
    if (!user) {
      throw new HttpError("Unauthorized", 401);
    }

    await revokeRefreshToken(savedRefreshToken.id);
    const newJti = uuid();

    const { token, refreshToken: newRefreshToken } = generateTokens(user, newJti);
    await addRefreshTokenToWhitelist(newJti, newRefreshToken, user.id || "");

    res.status(200).json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new HttpError("Missing required fields", 400);
    }

    const payload = jwtVerify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;

    if (typeof payload !== "object" || !payload.jti) {
      throw new HttpError("Unauthorized", 401);
    }

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked) {
      throw new HttpError("Unauthorized", 401);
    }

    await revokeRefreshTokensByUserId(savedRefreshToken.userId);

    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

export { register, login, refreshToken, logout };
