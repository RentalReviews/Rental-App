import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";

const errorHandler = (error: Error, req: Request, res: Response, _: NextFunction) => {
  console.log(error);

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON" });
  }

  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
