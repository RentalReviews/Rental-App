import { Heading } from "@chakra-ui/react";
import Posting from "components/Posting";
import { useEffect, useState } from "react";
import { Post } from "types/Post";
import "styles/userHome.css";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchData = () => {
    fetch("http://localhost:3000/api/v1/post/getposts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        console.log(posts);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Heading textAlign="center" noOfLines={1}>
        ALL POSTS
      </Heading>
      <div id="posts">
        {posts.map((post) => (
          <Posting
            key={post.id}
            post={{
              authorId: post.authorId,
              content: post.content,
              createdAt: post.createdAt,
              id: post.id,
              published: post.published,
              title: post.title,
              updatedAt: post.updatedAt,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
