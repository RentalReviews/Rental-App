import { verify as jwtVerify } from "jsonwebtoken";

import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "utils/jwt";

interface RequestWithToken extends Request {
  payload?: JwtPayload;
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new HttpError("Unauthorized", 401);
  }

  try {
    const decoded = jwtVerify(token, process.env.JWT_ACCESS_SECRET as string);

    if (typeof decoded !== "object") {
      throw new HttpError("Unauthorized", 401);
    }

    (req as RequestWithToken).payload = decoded;
  } catch (error) {
    throw new HttpError("Unauthorized", 401);
  }

  return next();
};

export { isAuthenticated, type RequestWithToken };
