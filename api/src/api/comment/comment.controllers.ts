import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "api/comment/comment.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";

const CreateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, postId, authorId } = req.body;
    if (!content || !postId || !authorId) {
      throw new HttpError("Missing required fields", 400);
    }
    const newComment = await createComment(content, postId, authorId);

    res.status(201).json({
      newComment,
    });
  } catch (error) {
    next(error);
  }
};
const GetComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comments = await getAllComments();
    res.status(201).json({
      comments,
    });
  } catch (error) {
    next(error);
  }
};
const UpdateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, commentId } = req.body;
    if (!content || !commentId) {
      throw new HttpError("Missing required fields", 400);
    }
    const updatedComment = await updateComment(commentId, content);

    res.status(201).json({
      updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.body;
    if (!commentId) {
      throw new HttpError("Missing required fields", 400);
    }
    const deletedcomment = await deleteComment(commentId);
    res.status(201).json({
      deletedcomment,
    });
  } catch (error) {
    next(error);
  }
};

export { CreateComment, GetComments, UpdateComment, DeleteComment };
