import { verify as jwtVerify } from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "utils/jwt";

interface RequestWithToken extends Request {
  payload?: JwtPayload;
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwtVerify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "object") {
      res.status(401);
      throw new Error("Unauthorized");
    }

    (req as RequestWithToken).payload = decoded;
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  return next();
};

export { isAuthenticated, type RequestWithToken };
