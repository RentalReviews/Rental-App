import { getUserByEmail, getUserById } from "api/users/users.services";
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
      user,
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
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { GetUserByEmail, GetUserById };
