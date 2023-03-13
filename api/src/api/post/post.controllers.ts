import {
  createPost,
  createPostPhoto,
  getAllPosts,
  getAllPhotos,
  updatePost,
  deletePost,
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
const UpdatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, postId } = req.body;
    if (!title || !content || !postId) {
      throw new HttpError("Missing required fields", 400);
    }
    const upPost = await updatePost(postId, title, content);

    res.status(201).json({
      upPost,
    });
  } catch (error) {
    next(error);
  }
};
const GetPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const photos = await getAllPhotos();
    res.status(201).json({
      photos,
    });
  } catch (error) {
    next(error);
  }
};
const DeletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      throw new HttpError("Missing required fields", 400);
    }
    const deletedPost = await deletePost(postId);
    res.status(201).json({
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

export { CreatePost, GetPosts, GetPhotos, UpdatePost, DeletePost };
