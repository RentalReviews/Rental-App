import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} from "api/comment/comment.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";
import type { RequestWithToken } from "middlewares/auth";

const CreateComment = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const { content, postId } = req.body;
    const userId = req.payload?.id || "";

    if (!userId) {
      throw new HttpError("Unauthorized", 401);
    }

    if (!content || !postId) {
      throw new HttpError("Missing required fields", 400);
    }

    const newComment = await createComment(content, postId, userId);

    res.status(201).json({
      newComment,
    });
  } catch (error) {
    next(error);
  }
};

const GetComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const comment = await getComment(id);
    if (!comment) {
      throw new HttpError(`Comment with id = ${id} does not exist`, 404);
    }

    res.status(200).json({
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const UpdateComment = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.payload?.id || "";

    if (!content) {
      throw new HttpError("Missing required fields", 400);
    }

    const comment = await getComment(id);
    if (!comment) {
      throw new HttpError(`Comment with id = ${id} does not exist`, 404);
    }

    if (comment.authorId !== userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const updatedComment = await updateComment(id, content);
    res.status(200).json({
      updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteComment = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.payload?.id || "";

    const comment = await getComment(id);
    if (!comment) {
      throw new HttpError(`Comment with id = ${id} does not exist`, 404);
    }

    if (comment.authorId !== userId) {
      throw new HttpError("Unauthorized", 401);
    }

    await deleteComment(id);
    res.status(200).json({
      message: "Comment deleted",
    });
  } catch (error) {
    next(error);
  }
};

export { CreateComment, UpdateComment, DeleteComment, GetComment };
