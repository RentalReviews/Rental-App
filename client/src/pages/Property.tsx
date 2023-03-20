import React, { useState } from "react";
import InfoCard from "components/InfoCard";
import Review from "components/review";
import { useLocation } from "react-router-dom";
import { Comment } from "../types/Comment";

const Property = () => {
  const { state } = useLocation();

  const [comment, setComment] = useState<Comment>({ comment: "" });
  const [comments, setComments] = useState<Comment[]>([]);

  const updateComments = () => {
    setComments([...comments, comment]);
    setComment({ comment: "" });
  };

  console.log(state);

  // Add GetAll

  // Use users/token/:id to get refreshToken for posting data
  // Placed into local storage instead but let's keep the endPoints incase they
  // are required later

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
          rating: state.Post.rating ? state.Post.rating : 3,
          content: state.Post.content,
        }}
      />
      <br />
      <div id="comments">
        {comments.map((comment, i) => (
          <Review key={i} comment={{ comment: comment.comment }} />
        ))}
      </div>
    </>
  );
};
export default Property;
