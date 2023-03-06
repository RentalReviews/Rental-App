import jwt from "jsonwebtoken";

import { User } from "@prisma/client";

const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15m",
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
    process.env.JWT_SECRET as string,
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

export { generateToken, generateRefreshToken, generateTokens };
