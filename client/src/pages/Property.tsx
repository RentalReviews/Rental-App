import { useState, useEffect } from "react";
import InfoCard from "components/InfoCard";
import Review from "components/review";
import { useLocation } from "react-router-dom";
import { Comment } from "../types/Comment";
/**
 * Remove modal from InfoCard and bring to Property
 * Need to have it in property so we can
 *
 * Pass post data from UserHome
 *
 */
const Property = () => {
  const API_URL = import.meta.env.DEV
    ? `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}/api/v1`
    : "";

  const { state } = useLocation();

  const [comment, setComment] = useState<Comment>({
    authorId: "",
    content: "",
    id: "",
    postId: "",
  });
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPostComments().then((data) => {
      setComments(data);
    });
  }, [comments.length]);

  const updateComments = () => {
    setComments([...comments, comment]);
    postComment();
  };

  const removeComment = (commentId: string | undefined): void => {
    const newCommentArray = comments.filter((comment) => comment.id !== commentId);
    setComments(newCommentArray);
  };

  const updateAfterEdit = (commentId: string | undefined): void => {
    const prevComment: Comment | undefined = comments.find((c) => c.id === commentId);
    const newComment: Comment = {
      authorId: prevComment?.authorId,
      createdAt: prevComment?.createdAt,
      updatedAt: prevComment?.updatedAt,
      id: prevComment?.id,
      postId: prevComment?.postId,
      content: comment.content,
    };
    const newCommentArray = comments
      .filter((comment) => comment.id !== commentId)
      .concat(newComment);
    setComments(newCommentArray);
  };

  const editComment = async (commentId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          content: comment.content,
        }),
      });
      if (response.status == 201) {
        updateAfterEdit(commentId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (commentId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status == 201) {
        removeComment(commentId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = () => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();

    try {
      fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          content: comment.content,
          postId: state.Post.id,
          authorId: token,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getPostComments = async () => {
    try {
      const response = await fetch(`${API_URL}/postings/${state.Post.id}`);
      const json = await response.json();
      return json.post.comments;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <InfoCard
        comment={comment}
        setComment={setComment}
        updateComments={updateComments}
        key={99}
        post={state.Post}
      />
      <br />
      <div id="comments">
        {comments.map((comment, i) => (
          <Review
            key={i}
            comment={comment}
            authorId={comment.authorId ? comment.authorId : "No ID"}
            deleteReview={() => deleteReview(comment.id)}
            setComment={setComment}
            editComment={() => editComment(comment.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Property;
