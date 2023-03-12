import { Dispatch, SetStateAction, useRef } from "react";
import { Badge, Box, Button, Textarea } from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import "styles/userHome.css";

interface props {
  post: Post;
  comment: Comment;
  setComment: Dispatch<SetStateAction<Comment>>;
  updateComments: () => void;
}
const InfoCard = (props: props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleCommentForm = () => {
    if (inputRef.current == null) {
      return;
    }

    if (inputRef.current.style.display == "block") {
      inputRef.current.style.display = "none";
      return;
    }
    if (inputRef.current.style.display == "") {
      inputRef.current.style.display = "block";
      return;
    }
    inputRef.current.style.display = "block";
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
      </Box>
      <div id="posts"></div>

      <Box display="flex">
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />} onClick={toggleCommentForm}>
          Comment
        </Button>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.updateComments();
        }}
      >
        <Box display="none" id="textArea" ref={inputRef}>
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
