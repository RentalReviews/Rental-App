import { createPost, getAllPosts, updatePost, deletePost, getPost } from "api/post/post.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";

const CreatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, authorId, url } = req.body;
    if (!title || !content || !authorId) {
      throw new HttpError("Missing required fields", 400);
    }
    const newPost = await createPost(authorId, title, content, url ? url : url);
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
const UpdatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content, url } = req.body;
    if (!title || !content) {
      throw new HttpError("Missing required fields", 400);
    }
    const upPost = await updatePost(id, title, content, url ? url : url);
    if (!upPost) {
      throw new HttpError(`Post with id = ${id} does not exist`, 404);
    }
    res.status(201).json({
      upPost,
    });
  } catch (error) {
    next(error);
  }
};

const DeletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    if (!deletePost) {
      throw new HttpError(`Post with id = ${id} does not exist`, 404);
    }
    res.status(201).json({
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

export { CreatePost, GetPost, GetPosts, UpdatePost, DeletePost };
