import { getUserByEmail, getUserById, updateProfile } from "api/users/users.services";
import HttpError from "utils/http-error";
import type { RequestWithToken } from "middlewares/auth";
import type { Request, Response, NextFunction } from "express";

const GetUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      throw new HttpError(`User with email = ${email} does not exist`, 404);
    }
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paramId = req.params.id;
    const user = await getUserById(paramId);
    if (!user) {
      throw new HttpError(`User with id = ${paramId} does not exist`, 404);
    }
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};

const UpdateUser = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const payloadId = req.payload?.id || "";
    const paramId = req.params.id;
    if (paramId !== payloadId) throw new HttpError("user not authenticated", 401);
    const { avatarUrl, bio, email, displayName } = req.body;
    if (paramId !== payloadId) throw new HttpError("user not authenticated", 401);
    if (!displayName || !email) {
      throw new HttpError("Missing required display name, email cannot update", 400);
    }
    const updatedProfile = await updateProfile(payloadId, avatarUrl, bio, email, displayName);
    res.status(200).json({
      updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

export { GetUserByEmail, GetUserById, UpdateUser };
