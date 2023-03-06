import { Heading } from "@chakra-ui/react";
import Posting from "components/Posting";
import { PostForm } from "components/PostForm";
import { useState } from "react";
import { Post } from "components/interfaces/Post";
import "./../styles/userHome.css";

const Home = () => {
  const [post, setPost] = useState<Post>({ address: "", imageUrl: "", rating: 0 });
  const [posts, setPosts] = useState<Post[]>([]);

  const updatePosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPosts([...posts, post]);
    setPost({ address: "", imageUrl: "", rating: 0 });
  };

  console.log(posts);

  return (
    <>
      <Heading textAlign="center" noOfLines={1}>
        MY POSTINGS
      </Heading>
      <PostForm post={post} setPost={setPost} updatePosts={updatePosts} />
      <div id="posts">
        <Posting
          key={10}
          post={{
            address: "  2445 Guilfasdfasord dr, Abbotsford BC",
            imageUrl:
              "https://photos.zillowstatic.com/fp/aa9a8e5dda311b0a079dd0e9d2319116-uncropped_scaled_within_1536_1152.webp",
            rating: 2,
            caption:
              "I used to live at Le56dn 14 Main Street and had a Landlord called Mrs Beverley Toloczko. We warn you DO NOT TAKE THIS PROPERTY FROM HER SHE IS A LANDLORD FROM HELL. This woman is the worst woman I have ever come across in my life. She is a vile creature to set foot on this earth and has no regards to human feelings. She lies and twists things. We moved into the property with several things wrong. Stair floorboards were broken, radiators were broken curtain poles were broken drain was blocked sink smelt of sewers and she has ignored us refused to fix anything and thinks it’s okay to demand payment at 9am in the morning. She doesn’t live up to her part yet we continued to live to ours. She lied to us that she was selling the property to find on rightmove this property was up for rent again. Not that we want to live there as there is currently a wasp infestation not to mention none of the issues I have just said have been fixed. We warn you to not rent this property. She made me fall ill and Take sick from work due to stress she put me through threatening to make me homeless not following any rules stated in the legal tenancy agreement. We just want to put this out there to anyone looking at 14 Main Street LE56DN to rent. DONT DO IT.",
          }}
        />
        <Posting
          key={10}
          post={{
            address: "  34030 McCrimmon Dr, Abbotsford, BC V2S 2V5",
            imageUrl:
              "https://photos.zillowstatic.com/fp/30aa1553267b2dd1173ede8d0557572f-o_a.webp",
            rating: 4,
            caption:
              "The house is in a great location and is extremely well looked after by Hannah. If there was ever an issue, it would be sorted immediately with no hassle. Very spacious, and modern looking home with a converted garage (man cave!)",
          }}
        />
        <div id="posts">
          {posts.map((post, i) => (
            <Posting
              key={i}
              post={{ address: post.address, imageUrl: post.imageUrl, rating: post.rating }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
