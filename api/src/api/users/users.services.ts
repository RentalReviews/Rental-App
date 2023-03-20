import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { prismaClient } from "utils/db";

const SALT_ROUNDS = 12;

const createUser = async (email: string, password: string, displayName: string) => {
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  const newUser = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
      displayName,
    },
  });

  const newProfile = await prismaClient.profile.create({
    data: {
      userId: newUser.id,
    },
  });

  return { newUser, newProfile };
};

const getUserByEmail = async (email: string) => {
  const result = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  return result;
};

const getUserRefreshTokens = async (userId: string) => {
  // console.log('getUserByEmail', userId);

  const result = await prismaClient.refreshToken.findMany({
    where: {
      userId,
    },
  });

  return result;

  // console.log('refreshTokenData', refreshTokenData);
};

const getUserById = async (id: string) => {
  const result = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export { createUser, getUserByEmail, getUserById, getUserRefreshTokens };
