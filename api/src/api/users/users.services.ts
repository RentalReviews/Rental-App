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

const getUserById = async (id: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
  const profile = await prismaClient.profile.findUnique({
    where: {
      userId: id,
    },
  });
  return { ...user, ...profile };
};

const updateProfile = async (
  userId: string,
  avatarUrl: string,
  bio: string,
  email: string,
  displayName: string
) => {
  const result = await prismaClient.profile.update({
    where: {
      userId: userId,
    },
    data: {
      avatarUrl: avatarUrl,
      bio: bio,
    },
  });
  const result2 = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      email: email,
      displayName: displayName,
    },
  });
  const finalResult = { ...result, ...result2 };
  return finalResult;
};

export { createUser, getUserByEmail, getUserById, updateProfile };
