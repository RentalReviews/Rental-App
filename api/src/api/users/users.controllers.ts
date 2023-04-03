import {
  getUserByEmail,
  getUserById,
  getUserProfileById,
  updateProfile,
  updateUser,
} from "api/users/users.services";
import HttpError from "utils/http-error";

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

const GetUserProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const profile = await getUserProfileById(id);
    console.log("profile", profile);
    if (!profile) {
      throw new HttpError(`User profile with id = ${id} does not exist`, 404);
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

const GetUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    console.log(user);
    if (!user) {
      throw new HttpError(`User with id = ${id} does not exist`, 404);
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

const UpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email, displayName } = req.body;
    const updatedUser = await updateUser(id, email, displayName);
    res.status(200).json({
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

const UpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { avatarUrl, bio } = req.body;
    const updatedProfile = await updateProfile(id, avatarUrl, bio);
    res.status(200).json({
      updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

export { GetUserByEmail, GetUserById, GetUserProfileById, UpdateUser, UpdateProfile };
