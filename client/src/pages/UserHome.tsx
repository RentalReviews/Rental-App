import { Heading, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import Posting from "components/Posting";
import { PostForm } from "components/PostForm";
import { useState, useEffect } from "react";
import { Post } from "types/Post";
import "styles/userHome.css";
import jwt_decode from "jwt-decode";
import { RefreshToken } from "types/RefreshToken";
import { genericErrorHandler } from "utils";

const Home = () => {
  const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

  const toast = useToast();
  const [post, setPost] = useState<Post>({
    authorId: "",
    comments: [],
    content: "",
    createdAt: new Date(),
    id: "",
    postPhotos: [],
    published: false,
    updatedAt: new Date(),
    title: "",
    rating: 0,
  });
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

  const updatePosts = () => {
    setPosts([...posts, post]);
    console.log(post);
    postReview(post);
    setPost({
      authorId: "",
      comments: [],
      content: "",
      createdAt: new Date(),
      id: "",
      postPhotos: [],
      published: false,
      updatedAt: new Date(),
      title: "",
      rating: 0,
    });
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
      await fetch(`${API_URL}/postings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          // Can't input the ID for the post, it's generated on server side
          authorId: post.authorId,
          comments: post.comments,
          content: post.content,
          createdAt: post.createdAt,
          id: "Does this autogenerate",
          postPhotos: post.postPhotos,
          published: post.published,
          updatedAt: post.updatedAt,
          title: post.title,
          rating: post.rating,
        }),
      }).then((response) => {
        if (response.status == 201) {
          addPostToUI();
        }
      });
    } catch (err) {
      genericErrorHandler(err, toast);
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
      await fetch(`${API_URL}/postings/${postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((response) => {
        if (response.status == 201) {
          removePostFromUI(postId);
        }
      });
    } catch (err) {
      genericErrorHandler(err, toast);
    }
  };

  return (
    <>
      <Heading textAlign="center" noOfLines={1} mb={3}>
        Home - {isOnline ? "Online" : "Offline"}
      </Heading>
      {isOnline && <PostForm post={post} setPost={setPost} updatePosts={updatePosts} />}
      <div id="posts">
        <div id="posts">
          <Wrap>
            {posts.map((post, i) => {
              return (
                <WrapItem key={i}>
                  <Posting
                    key={i}
                    post={{
                      authorId: post.authorId,
                      comments: post.comments,
                      content: post.content,
                      createdAt: post.createdAt,
                      id: post.id,
                      postPhotos: post.postPhotos,
                      published: post.published,
                      updatedAt: post.updatedAt,
                      title: post.title,
                      rating: post.rating,
                    }}
                    deletePost={() => deletePost(post.id)}
                  />
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
