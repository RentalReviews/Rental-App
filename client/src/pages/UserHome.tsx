import { Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import Posting from "components/Posting";
import { PostForm } from "components/PostForm";

import type { Post } from "types/Post";
import type { RefreshToken } from "types/RefreshToken";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const REFRESH_TOKEN: RefreshToken | string | null = localStorage.getItem("REFRESH_TOKEN") || "";
  let decoded: RefreshToken | undefined = undefined;
  if (REFRESH_TOKEN) {
    decoded = jwt_decode(localStorage.getItem("REFRESH_TOKEN") || "");
  }
  const [isOnline, setIsOnline] = useState(
    decoded
      ? (decoded.exp ? decoded.exp : Number.MAX_SAFE_INTEGER) > (new Date().getTime() + 1) / 1000
      : false
  );

  useEffect(() => {
    getAll().then((data) => {
      setPosts(data.posts);
    });
    const updateOnline = () => {
      setIsOnline(
        decoded
          ? (decoded.exp ? decoded.exp : Number.MAX_SAFE_INTEGER) >
              (new Date().getTime() + 1) / 1000
          : false
      );
    };
    updateOnline();
  }, [posts.length]);

  const getAll = async () => {
    try {
      const response = await fetch(`${API_URL}/postings`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heading textAlign="center" noOfLines={1} mb={3}>
        Home - {isOnline ? "Online" : "Offline"}
      </Heading>
      {isOnline && <PostForm />}
      <div id="posts">
        <div id="posts">
          <Wrap>
            {posts.map((post, i) => {
              return (
                <WrapItem key={i}>
                  <Posting key={i} post={post} />
                </WrapItem>
              );
            })}
          </Wrap>
        </div>
      </div>
    </>
  );
};

export default Home;
