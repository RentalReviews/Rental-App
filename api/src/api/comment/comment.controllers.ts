import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
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

const GetComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const comment = await getComment(id);
    if (!comment) {
      throw new HttpError(`Comment with id = ${id} does not exits`, 400);
    }

    res.status(201).json({
      comment,
    });
  } catch (error) {
    next(error);
  }
};
const UpdateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content || !id) {
      throw new HttpError("Missing required fields", 400);
    }
    const updatedComment = await updateComment(id, content);
    if (!updateComment) {
      throw new HttpError(`Comment with id = ${id} does not exits`, 400);
    }
    res.status(201).json({
      updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedcomment = await deleteComment(id);
    if (!deleteComment) {
      throw new HttpError(`Comment with id = ${id} does not exits`, 400);
    }
    res.status(201).json({
      deletedcomment,
    });
  } catch (error) {
    next(error);
  }
};

export { CreateComment, UpdateComment, DeleteComment, GetComment };
