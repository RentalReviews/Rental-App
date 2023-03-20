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
  const [comment, setComment] = useState<Comment>({ content: "" });
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getPostComments().then((data) => setComments(data));
  }, [comments]);

  const updateComments = () => {
    setComments([...comments, comment]);
    postComment();
    setComment({ content: "" });
  };

  // const deleteReview = async (commentId:string|undefined) => {
  //   const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
  //   try {
  //     fetch(`http://localhost:4466/api/v1/comments/${commentId}`, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       },
  //     });
  //     console.log("comment successfully deleted");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
      console.log("comment successfully posted");
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
          <Review key={i} comment={comment} authorId={comment.authorId} />
        ))}
      </div>
    </>
  );
};
export default Property;
