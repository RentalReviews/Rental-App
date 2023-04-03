import { prismaClient } from "utils/db";
import { getCoordinates } from "utils/google-map";

interface UploadedPhoto {
  id?: string;
  url: string;
}

const createPost = async (
  authorId: string,
  rating: number,
  title: string,
  content: string,
  postPhotos: UploadedPhoto[] = []
) => {
  const newPost = await prismaClient.post.create({
    data: {
      title,
      content,
      rating,
      authorId,
      postPhotos: {
        create: postPhotos.map((photo) => ({
          url: photo.url,
        })),
      },
    },
    include: {
      author: {
        select: {
          displayName: true,
        },
      },
      postPhotos: true,
    },
  });

  getCoordinates(newPost.title).then((coordinates) => {
    if (coordinates) {
      prismaClient.post
        .update({
          where: {
            id: newPost.id,
          },
          data: {
            latitude: parseFloat(coordinates.lat),
            longitude: parseFloat(coordinates.lng),
          },
        })
        .then();
    }
  });

  return {
    ...newPost,
    comments: [],
  };
};

const updatePost = async (
  postId: string,
  title: string,
  rating: number,
  content: string,
  postPhotos: UploadedPhoto[]
) => {
  postPhotos.forEach((photo) => {
    if (photo.id) {
      updatePostPhoto(photo.url, photo.id);
    } else {
      createPostPhoto(photo.url, postId);
    }
  });
  const post = await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      content: content,
      rating: rating,
    },
    include: {
      author: {
        select: {
          displayName: true,
        },
      },
      postPhotos: true,
      comments: {
        include: {
          author: {
            select: {
              displayName: true,
            },
          },
        },
      },
    },
  });

  getCoordinates(post.title).then((coordinates) => {
    if (coordinates) {
      prismaClient.post
        .update({
          where: {
            id: post.id,
          },
          data: {
            latitude: parseFloat(coordinates.lat),
            longitude: parseFloat(coordinates.lng),
          },
        })
        .then();
    }
  });

  return post;
};

const deletePost = async (postId: string) => {
  const del = await prismaClient.post.update({
    where: {
      id: postId,
    },
    data: {
      published: false,
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
      author: {
        select: {
          displayName: true,
        },
      },
      postPhotos: true,
      comments: {
        include: {
          author: {
            select: {
              displayName: true,
            },
          },
        },
      },
    },
  });

  if (post && !post.published) return null;

  return post;
};

const getAllPosts = async () => {
  const posts = await prismaClient.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          displayName: true,
        },
      },
      postPhotos: true,
      comments: {
        include: {
          author: {
            select: {
              displayName: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
