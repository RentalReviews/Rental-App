import { useState, useEffect } from "react";
import InfoCard from "components/InfoCard";
import Review from "components/review";
import { useLocation } from "react-router-dom";
import { Comment } from "../types/Comment";

const Property = () => {
  const { state } = useLocation();
  /**
   * State contains Post which has
   * createdAt
   * id
   * postId
   * updatedAt
   * url
   */
  const [comment, setComment] = useState<Comment>({
    authorId: "",
    content: "",
    id: "",
    postId: "",
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [userId, setUserId] = useState<string>("");

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

  const deleteReview = async (commentId: string | undefined) => {
    console.log(comment);
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      fetch(`http://localhost:4466/api/v1/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      removeComment(commentId);
    }
  };

  const postComment = () => {
    console.log("postComment");
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      fetch("http://localhost:4466/api/v1/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          content: comment.content,
          postId: state.Post.postPhotos[0].postId,
          authorId: token,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getPostComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:4466/api/v1/posts/${state.Post.postPhotos[0].postId}`
      );
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
        post={{
          title: state.Post.title,
          postPhotos: state.Post.postPhotos,
          rating: state.Post.rating ? state.Post.rating : 6,
          content: state.Post.content,
        }}
      />
      <br />
      <div id="comments">
        {comments.map((comment, i) => (
          <Review
            key={i}
            comment={comment}
            authorId={comment.authorId ? comment.authorId : "No ID"}
            deleteReview={() => deleteReview(comment.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Property;
