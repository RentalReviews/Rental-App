import { createPost, getAllPosts, updatePost, deletePost, getPost } from "api/post/post.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";
import type { RequestWithToken } from "middlewares/auth";

const CreatePost = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const { title, content, postPhotos } = req.body;
    const userId = req.payload?.id || "";

    if (!userId) {
      throw new HttpError("Unauthorized", 401);
    }

    if (!title || !content) {
      throw new HttpError("Missing required fields", 400);
    }

    const newPost = await createPost(userId, title, content, postPhotos);
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    next(error);
  }
};

const GetPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getAllPosts();
    res.status(201).json({
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const GetPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await getPost(id);
    if (!post) {
      throw new HttpError(`Post with id = ${id} does not exist`, 404);
    }
    res.status(201).json({
      post,
    });
  } catch (error) {
    next(error);
  }
};

const UpdatePost = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.payload?.id || "";
    const { title, content, postPhotos } = req.body;

    if (!title || !content) {
      throw new HttpError("Missing required fields", 400);
    }

    const post = await getPost(id);
    if (!post) {
      throw new HttpError(`Post with id = ${id} does not exist`, 404);
    }

    if (post.authorId !== userId) {
      throw new HttpError("Unauthorized", 401);
    }

    const upPost = await updatePost(id, title, content, postPhotos);

    res.status(201).json({
      upPost,
    });
  } catch (error) {
    next(error);
  }
};

const DeletePost = async (req: RequestWithToken, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.payload?.id || "";

    const post = await getPost(id);
    if (!post) {
      throw new HttpError(`Post with id = ${id} does not exist`, 404);
    }

    if (post.authorId !== userId) {
      throw new HttpError("Unauthorized", 401);
    }

    await deletePost(id);
    res.status(201).json({
      message: "Post deleted",
    });
  } catch (error) {
    next(error);
  }
};

export { CreatePost, GetPost, GetPosts, UpdatePost, DeletePost };
