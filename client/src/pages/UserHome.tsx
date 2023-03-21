import { Heading } from "@chakra-ui/react";
import Posting from "components/Posting";
import { PostForm } from "components/PostForm";
import { useState, useEffect } from "react";
import { Post } from "types/Post";
import "styles/userHome.css";

const Home = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    postPhotos: [],
    rating: 0,
    content: "",
  });
  const [posts, setPosts] = useState<Post[]>([]);

  const updatePosts = () => {
    setPosts([...posts, post]);
    postReview(post);
    setPost({ title: "", postPhotos: [], rating: 0 });
  };

  useEffect(() => {
    getAll().then((data) => {
      setPosts(data.posts);
    });
  }, [posts.length]);

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:4466/api/v1/posts");
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const postReview = async (post: Post) => {
    console.log("posting review...", post);
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      fetch("http://localhost:4466/api/v1/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: post.id,
          content: post.content,
          title: post.title,
          authorId: token,
          postPhotos: post.postPhotos,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removePostFromUI = (postId: string | undefined): void => {
    const newPostsArray = posts.filter((comment) => comment.id !== postId);
    console.log(newPostsArray.length);
    setPosts(newPostsArray);
  };

  const deletePost = async (postId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      await fetch(`http://localhost:4466/api/v1/posts/${postId}`, {
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
      <PostForm post={post} setPost={setPost} updatePosts={updatePosts} />
      <div id="posts">
        {/* <Posting
          key={10}
          post={{
            title: "2445 Guilfasdfasord dr, Abbotsford BC",
            postPhotos: [
              {
                url: "https://photos.zillowstatic.com/fp/aa9a8e5dda311b0a079dd0e9d2319116-uncropped_scaled_within_1536_1152.webp",
              },
            ],
            rating: 2,
            caption:
              "I used to live at Le56dn 14 Main Street and had a Landlord called Mrs Beverley Toloczko. We warn you DO NOT TAKE THIS PROPERTY FROM HER SHE IS A LANDLORD FROM HELL. This woman is the worst woman I have ever come across in my life. She is a vile creature to set foot on this earth and has no regards to human feelings. She lies and twists things. We moved into the property with several things wrong. Stair floorboards were broken, radiators were broken curtain poles were broken drain was blocked sink smelt of sewers and she has ignored us refused to fix anything and thinks it’s okay to demand payment at 9am in the morning. She doesn’t live up to her part yet we continued to live to ours. She lied to us that she was selling the property to find on rightmove this property was up for rent again. Not that we want to live there as there is currently a wasp infestation not to mention none of the issues I have just said have been fixed. We warn you to not rent this property. She made me fall ill and Take sick from work due to stress she put me through threatening to make me homeless not following any rules stated in the legal tenancy agreement. We just want to put this out there to anyone looking at 14 Main Street LE56DN to rent. DONT DO IT.",
          }}
        /> */}
        {/* <Posting
          key={11}
          post={{
            title: "  34030 McCrimmon Dr, Abbotsford, BC V2S 2V5",
            postPhotos: [
              {
                url: "https://photos.zillowstatic.com/fp/30aa1553267b2dd1173ede8d0557572f-o_a.webp",
              },
            ],
            rating: 4,
            caption:
              "The house is in a great location and is extremely well looked after by Hannah. If there was ever an issue, it would be sorted immediately with no hassle. Very spacious, and modern looking home with a converted garage (man cave!)",
          }}
        /> */}
        <div id="posts">
          {posts.map((post, i) => (
            <Posting
              key={i}
              post={{
                title: post.title,
                postPhotos: post.postPhotos,
                rating: post.rating,
                content: post.content,
              }}
              deletePost={() => deletePost(post.id)}
              authorId={post.authorId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
