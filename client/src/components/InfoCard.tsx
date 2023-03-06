import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, Badge, Box, Button, Image, Textarea } from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { StarIcon } from "@chakra-ui/icons";
import { Post } from "./interfaces/Post";
import { Comment } from "./interfaces/Comment";
import "./../styles/userHome.css";

interface props {
  post: Post;
  comment: Comment;
  setComment: Dispatch<SetStateAction<Comment>>;
  updateComments: (e: any) => void;
}
const InfoCard: React.FC<props> = (props) => {
  const toggleCommentForm = () => {
    console.log(document.getElementById("textArea")!.style);
    if (document.getElementById("textArea")!.style.display == "block") {
      document.getElementById("textArea")!.style.display = "none";
      return;
    }
    if (document.getElementById("textArea")!.style.display == "") {
      document.getElementById("textArea")!.style.display = "block";
      return;
    }
    document.getElementById("textArea")!.style.display = "block";
  };

  return (
    <Box
      maxW="8xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box w="100%" mt="3" fontWeight="semibold" as="h1" lineHeight="tight" noOfLines={1}>
          {props.post.address}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < props.post.rating ? "teal.500" : "gray.300"} />
            ))}
        </Box>
      </Box>
      <div id="posts">
        <Box>{props.post.caption}</Box>

        <Image
          boxSize="sm"
          maxH="s"
          src={props.post.imageUrl}
          alt={"property.imageAlt"}
          borderRadius="md"
        />
      </div>

      <Box display="flex">
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />} onClick={toggleCommentForm}>
          Comment
        </Button>
      </Box>
      <form onSubmit={props.updateComments}>
        <Box display="none" id="textArea">
          <Textarea
            placeholder="Add a comment"
            name="myName"
            onChange={(e) => props.setComment({ comment: e.target.value })}
          />
          <Button type="submit">Add</Button>
        </Box>
      </form>
    </Box>
  );
};
export default InfoCard;
