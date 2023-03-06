import { hashToken } from "utils/hashToken";
import { prismaClient } from "utils/db";

function addRefreshTokenToWhitelist(jti: string, refreshToken: string, userId: string) {
  return prismaClient.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

const findRefreshTokenById = async (id: string) => {
  const result = await prismaClient.refreshToken.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const revokeRefreshToken = async (id: string) => {
  const result = await prismaClient.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });

  return result;
};

const revokeRefreshTokensByUserId = async (userId: string) => {
  const result = await prismaClient.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });

  return result;
};

export {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  revokeRefreshToken,
  revokeRefreshTokensByUserId,
};
