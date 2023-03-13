import {
  createPost,
  createPostPhoto,
  getAllPosts,
  getAllPhotos,
  updatePost,
  deletePost,
  getPost,
} from "api/post/post.services";
import HttpError from "utils/http-error";

import type { Request, Response, NextFunction } from "express";

const CreatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, authorId, imgUrl } = req.body;
    if (!title || !content || !authorId) {
      throw new HttpError("Missing required fields", 400);
    }
    const newPost = await createPost(authorId, title, content);
    if (imgUrl) {
      await createPostPhoto(imgUrl, newPost.id);
    }
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
    const posts = await getPost(id);
    res.status(201).json({
      posts,
    });
  } catch (error) {
    next(error);
  }
};
const UpdatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content || !id) {
      throw new HttpError("Missing required fields", 400);
    }
    const upPost = await updatePost(id, title, content);

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
    if (!id) {
      throw new HttpError("Missing required fields", 400);
    }
    const deletedPost = await deletePost(id);
    res.status(201).json({
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

export { CreatePost, GetPost, GetPosts, UpdatePost, DeletePost };
