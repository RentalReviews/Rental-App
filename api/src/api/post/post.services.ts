import { prismaClient } from "utils/db";

interface UploadedPhoto {
  id?: string;
  url: string;
}

const createPost = async (
  authorId: string,
  title: string,
  content: string,
  url: UploadedPhoto[]
) => {
  const newPost = await prismaClient.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  url?.forEach((url) => {
    createPostPhoto(url.url, newPost.id);
  });

  return newPost;
};

const updatePost = async (postId: string, title: string, content: string, url: UploadedPhoto[]) => {
  url.forEach((url) => {
    if (url.id) {
      updatePostPhoto(url.url, url.id);
    } else {
      createPostPhoto(url.url, postId);
    }
  });
  const post = await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      content: content,
    },
  });
  return post;
};

const deletePost = async (postId: string) => {
  const del = await prismaClient.post.delete({
    where: {
      id: postId,
    },
  });
  return del;
};

const getPost = async (postId: string) => {
  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      postPhotos: true,
      comments: true,
    },
  });
  return post;
};

const getAllPosts = async () => {
  const posts = await prismaClient.post.findMany({
    include: {
      postPhotos: true,
      comments: true,
    },
  });
  return posts;
};

const createPostPhoto = async (url: string, postId: string) => {
  const newPostPhoto = await prismaClient.postPhoto.create({
    data: {
      url,
      postId,
    },
  });
  return newPostPhoto;
};

const updatePostPhoto = async (url: string, photoId: string) => {
  const updatePostPhoto = await prismaClient.postPhoto.update({
    where: {
      id: photoId,
    },
    data: {
      url: url,
    },
  });
  return updatePostPhoto;
};

export { createPost, getPost, createPostPhoto, getAllPosts, updatePost, deletePost };
