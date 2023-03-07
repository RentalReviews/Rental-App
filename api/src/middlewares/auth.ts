import * as jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

interface RequestWithToken extends Request {
  payload: jwt.JwtPayload | string;
}

const isAuthenticated = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.payload = decoded;
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  return next();
};

export { isAuthenticated, type RequestWithToken };
