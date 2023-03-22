import { Heading, Input, Button } from "@chakra-ui/react";
import Posting from "components/Posting";
import { PostForm } from "components/PostForm";
import { useState, useEffect } from "react";
import { Post } from "types/Post";
import "styles/userHome.css";

const Home = () => {
  const API_URL = import.meta.env.DEV
    ? `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}/api/v1`
    : "";
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    postPhotos: [],
    rating: 0,
    content: "",
    authorId: "",
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchParam, setSearchParam] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchParam(e.target.value);
  };

  const updatePosts = () => {
    setPosts([...posts, post]);
    postReview(post);
    setPost({ title: "", postPhotos: [], rating: 0 });
  };

  useEffect(() => {
    getAll().then((data) => {
      setPosts(
        data.posts.filter((p: Post) => p.title?.toUpperCase().includes(searchParam.toUpperCase()))
      );
    });
  }, [searchParam]);

  const getAll = async () => {
    try {
      const response = await fetch(`${API_URL}/postings`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const postReview = async (post: Post) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      await fetch(`${API_URL}/postings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          // Can't input the ID for the post, it's generated on server side
          content: post.content,
          title: post.title,
          authorId: token,
          postPhotos: post.postPhotos,
        }),
      });
      addPostToUI();
    } catch (err) {
      console.log(err);
    }
  };

  const addPostToUI = (): void => {
    window.location.reload(); //temporary fix
    // Newly created post will show on the screen but it can't be accessed
    // setPosts([post, ...posts]);
  };

  const removePostFromUI = (postId: string | undefined): void => {
    const newPostsArray = posts.filter((comment) => comment.id !== postId);
    setPosts(newPostsArray);
  };

  const deletePost = async (postId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      await fetch(`${API_URL}/postings/${postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      removePostFromUI(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Heading textAlign="center" noOfLines={1}>
        Home
      </Heading>
      <Input
        onChange={(e) => handleSearch(e)}
        textAlign="center"
        placeholder="Search Posting"
        variant="flushed"
        htmlSize={20}
        width="auto"
      />{" "}
      <Button onClick={() => window.location.reload()}>Reset</Button>
      <PostForm post={post} setPost={setPost} updatePosts={updatePosts} />
      <div id="posts">
        <div id="posts">
          {posts.map((post, i) => (
            <Posting
              key={i}
              post={{
                title: post.title,
                postPhotos: post.postPhotos,
                rating: post.rating,
                content: post.content,
                authorId: post.authorId,
              }}
              deletePost={() => deletePost(post.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
