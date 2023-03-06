import React, { useState } from "react";
import InfoCard from "components/InfoCard";
import Review from "components/review";
import { useLocation } from "react-router-dom";
import { Comment } from "../types/Comment";

const Property = () => {
  const { state } = useLocation();

  const [comment, setComment] = useState<Comment>({ comment: "" });
  const [comments, setComments] = useState<Comment[]>([]);
  console.log(comment);

  const updateComments = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e");
    e.preventDefault();
    setComments([...comments, comment]);
    setComment({ comment: "" });
  };
  return (
    <>
      <InfoCard
        comment={comment}
        setComment={setComment}
        updateComments={updateComments}
        key={99}
        post={{
          address: state.Post.address,
          imageUrl: state.Post.imageUrl,
          rating: state.Post.rating,
          caption: state.Post.caption,
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
