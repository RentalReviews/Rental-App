import { prismaClient } from "utils/db";

const createComment = async (content: string, postId: string, authorId: string) => {
  const newcomment = await prismaClient.comment.create({
    data: {
      content: content,
      postId: postId,
      authorId: authorId,
    },
  });
  return newcomment;
};
const updateComment = async (commentId: string, content: string) => {
  const comment = await prismaClient.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });
  return comment;
};
const deleteComment = async (commentId: string) => {
  const del = await prismaClient.comment.delete({
    where: {
      id: commentId,
    },
  });
  return del;
};

const getComment = async (commentId: string) => {
  const comment = await prismaClient.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
};

export { createComment, updateComment, deleteComment, getComment };
