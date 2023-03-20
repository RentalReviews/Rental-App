import { getUserByEmail, getUserById, getUserRefreshTokens } from "api/users/users.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";

const GetUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      throw new HttpError(`User with email = ${email} does not exist`, 404);
    }
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      throw new HttpError(`User with id = ${id} does not exist`, 404);
    }
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetRefreshTokenById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const refreshTokenData = await getUserRefreshTokens(id);
    if (!refreshTokenData) {
      throw new HttpError(`User with id = ${id} does not have a refresh token`, 404);
    }
    res.status(200).json(refreshTokenData);
  } catch (err) {
    next(err);
  }
};

export { GetUserByEmail, GetUserById, GetRefreshTokenById };
