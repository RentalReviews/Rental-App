import * as jwt from "jsonwebtoken";

import type { User } from "@prisma/client";

interface JwtPayload extends jwt.JwtPayload {
  id?: string;
  email?: string;
  displayName?: string;
}

const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    },
    process.env.JWT_ACCESS_SECRET as string,
    {
      // expiresIn: "15m",
      expiresIn: "2d", // temporary fix
    }
  );
};

const generateRefreshToken = (user: User, jti: string) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.displayName,
      jti,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

const generateTokens = (user: User, jti: string) => {
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return { token, refreshToken };
};

export { generateToken, generateRefreshToken, generateTokens, type JwtPayload };
