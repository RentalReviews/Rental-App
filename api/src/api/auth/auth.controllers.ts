import { v4 as uuid } from "uuid";
import { compare as bcryptCompare } from "bcrypt";
import { verify as jwtVerify } from "jsonwebtoken";

import { generateTokens } from "utils/jwt";
import { getUserByEmail, createUser, getUserById } from "api/users/users.services";
import {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  revokeRefreshToken,
} from "api/auth/auth.services";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "utils/jwt";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      res.status(400);
      throw new Error("Missing required fields");
    }

    const user = await getUserByEmail(email);
    if (user) {
      res.status(400);
      throw new Error("Email already registered");
    }

    const newUser = await createUser(email, password, displayName);
    const jti = uuid();
    const { token, refreshToken } = generateTokens(newUser, jti);
    await addRefreshTokenToWhitelist(jti, refreshToken, newUser.id);

    res.status(201).json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Missing required fields");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcryptCompare(password, user.password);

    if (!isPasswordValid) {
      res.status(401);
      throw new Error("Invalid credentials");
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
      res.status(400);
      throw new Error("Missing required fields");
    }

    const payload = jwtVerify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as
      | string
      | JwtPayload;

    if (typeof payload !== "object" || !payload.jti || !payload.id) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await getUserById(payload.id);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await revokeRefreshToken(savedRefreshToken.id);
    const newJti = uuid();

    const { token, refreshToken: newRefreshToken } = generateTokens(user, newJti);
    await addRefreshTokenToWhitelist(newJti, newRefreshToken, user.id);

    res.status(200).json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

export { register, login, refreshToken };
