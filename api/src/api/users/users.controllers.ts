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

const GetUserProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const profile = await getUserProfileById(id);
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

    res.status(200).json({
      updatedProfile,
    });
  } catch (err) {
    next(err);
  }
};

export { GetUserByEmail, GetUserById, UpdateUser };