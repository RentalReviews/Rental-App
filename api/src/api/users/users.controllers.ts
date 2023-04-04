import {
  getUserByEmail,
  getUserById,
  getUserProfileById,
  updateProfile,
  updateUser,
} from "api/users/users.services";
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

const GetUserProfileById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const paramId = req.params.id;
    const profile = await getUserProfileById(paramId);
    if (!profile) {
      throw new HttpError(`User profile with id = ${paramId} does not exist`, 404);
    }
    res.status(200).json({
      profile: {
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetUserById = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const payloadId = req.payload?.id || "";
    const paramId = req.params.id;
    if (paramId !== payloadId) throw new HttpError("user not authenticated", 500);
    const user = await getUserById(payloadId);
    if (!user) {
      throw new HttpError(`User with id = ${payloadId} does not exist`, 404);
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

const UpdateUser = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const payloadId = req.payload?.id || "";
    const paramId = req.params.id;
    if (paramId !== payloadId) throw new HttpError("user not authenticated", 500);
    const { displayName, email } = req.body;

    if (!displayName || !email) {
      throw new HttpError("Missing required display name and email, cannot update", 400);
    }

    const updatedUser = await updateUser(payloadId, email, displayName);

    res.status(200).json({
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

const UpdateProfile = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const payloadId = req.payload?.id || "";
    const paramId = req.params.id;
    if (paramId !== payloadId) throw new HttpError("user not authenticated", 500);
    const { avatarUrl, bio } = req.body;
    const updatedProfile = await updateProfile(payloadId, avatarUrl, bio);
    res.status(200).json({
      updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

export { GetUserByEmail, GetUserById, GetUserProfileById, UpdateUser, UpdateProfile };
