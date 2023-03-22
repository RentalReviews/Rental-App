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
    const prevComment = comments.find((c) => c.id === commentId);
    // const { authorId, createdAt, updatedAt, id, postId } = prevComment;
    const newComment: Comment = {
      authorId: prevComment!.authorId,
      createdAt: prevComment!.createdAt,
      updatedAt: prevComment!.updatedAt,
      id: prevComment!.id,
      postId: prevComment!.postId,
      content: comment,
    };
    const newCommentArray = comments
      .filter((comment) => comment.id !== commentId)
      .concat(newComment);
    setComments(newCommentArray);
  };

  const editComment = async (commentId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      fetch(`http://localhost:4466/api/v1/comments/${commentId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          content: comment,
        }),
      });
    } catch (err) {
      console.log(err);
    } finally {
      updateAfterEdit(commentId);
    }
  };

  const deleteReview = async (commentId: string | undefined) => {
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
        `http://localhost:4466/api/v1/postings/${state.Post.postPhotos[0].postId}`
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
          authorId: state.Post.authorId,
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
            setComment={setComment}
            editComment={() => editComment(comment.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Property;
