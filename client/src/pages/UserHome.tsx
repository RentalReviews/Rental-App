import { Button, Heading, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Posting from "components/Posting";
import { PostForm } from "components/PostForm";
import { userSelector } from "redux/user";

import type { Post } from "types/Post";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useSelector(userSelector);

  useEffect(() => {
    getAll().then((data) => {
      setPosts(data.posts);
    });
  }, []);

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
        Home
      </Heading>
      {user && (
        <>
          <Button ml={3} mb={3} colorScheme="blue" onClick={onOpen}>
            New Post
          </Button>
          <PostForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
      )}
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
    </>
  );
};

export default Home;
