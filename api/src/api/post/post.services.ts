import { prismaClient } from "utils/db";

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
  // for each photo use prisma client and delete them, then recreate them, easier than
  // doing multiple put requests, we can optimize later. Just delete all, and then create all.
  // front-end needs to change for this as well, no filtering is required.

  // Get all the images
  const currentPost = await getPost(postId);

  // Deleting
  await currentPost?.postPhotos.forEach(async (photo) => {
    if (photo.id) {
      await deletePostPhoto(photo.id);
    }
  });

  // Add all of the photos back to the database
  await postPhotos.forEach((photo) => {
    createPostPhoto(photo.url, postId);
  });

  // postPhotos.forEach((photo) => {
  //   if (photo.id) {
  //     updatePostPhoto(photo.url, photo.id);
  //   } else {
  //     createPostPhoto(photo.url, postId);
  //   }
  // });
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

const deletePostPhoto = async (photoId: string) => {
  const deletePostPhoto = await prismaClient.postPhoto.delete({
    where: {
      id: photoId,
    },
  });
  return deletePostPhoto;
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
