import { Heading } from "@chakra-ui/react";
import Posting from "components/Posting";
import { PostForm } from "components/PostForm";
import { useState, useEffect } from "react";
import { Post } from "types/Post";
import "styles/userHome.css";
import jwt_decode from "jwt-decode";
import { RefreshToken } from "types/RefreshToken";

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
  const REFRESH_TOKEN: RefreshToken | string | null = localStorage.getItem("REFRESH_TOKEN")
    ? localStorage.getItem("REFRESH_TOKEN")
    : "";
  let decoded: RefreshToken | undefined = undefined;
  if (REFRESH_TOKEN) {
    decoded = jwt_decode(localStorage.getItem("REFRESH_TOKEN") || "");
  }
  const [isOnline, setIsOnline] = useState(
    decoded
      ? (decoded.exp ? decoded.exp : Number.MAX_SAFE_INTEGER) > (new Date().getTime() + 1) / 1000
      : false
  );

  const updatePosts = () => {
    setPosts([...posts, post]);
    postReview(post);
    setPost({ title: "", postPhotos: [], rating: 0 });
  };

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

  const postReview = async (post: Post) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      const response = await fetch(`${API_URL}/postings`, {
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
      if (response.status == 201) {
        addPostToUI();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addPostToUI = (): void => {
    // window.location.reload(); //temporary fix
    setPosts([post, ...posts]);
  };

  const removePostFromUI = (postId: string | undefined): void => {
    const newPostsArray = posts.filter((comment) => comment.id !== postId);
    setPosts(newPostsArray);
  };

  const deletePost = async (postId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      const response = await fetch(`${API_URL}/postings/${postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status == 201) {
        removePostFromUI(postId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Heading textAlign="center" noOfLines={1}>
        Home - {isOnline ? "Online" : "Offline"}
      </Heading>
      {isOnline && <PostForm post={post} setPost={setPost} updatePosts={updatePosts} />}
      <div id="posts">
        <div id="posts">
          {posts.map((post, i) => (
            <Posting
              key={i}
              post={{
                id: post.id,
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
