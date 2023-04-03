import { useState, useEffect } from "react";
import InfoCard from "components/InfoCard";
import PostComment from "components/PostComment";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import type { Comment, Post } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const Property = () => {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setLoadingPost(true);
    setError(null);
    getPost()
      .then((data) => {
        setPost(data.post);
        setComments(data.post.comments);
        setLoadingPost(false);
      })
      .catch(() => {
        setLoadingPost(false);
        setError("An error occurred.");
      });
  }, []);

  const getPost = async () => {
    try {
      const response = await fetch(`${API_URL}/postings/${id}`);
      const json = await response.json();
      !json.post ? notFound() : void 0;
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const notFound = () => {
    toast({
      title: "Page not found",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <>
      {loadingPost && <Spinner size="xl" ml="45%" mt="30%" />}
      {!loadingPost && (
        <>
          {post && <InfoCard post={post} />}
          <br />

          <div id="comments">
            {comments.map((comment) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
          </div>

          {error && <p>{error}</p>}
        </>
      )}
    </>
  );
};

export default Property;
