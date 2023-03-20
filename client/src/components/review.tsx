import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import type { Comment } from "../types/Comment";

interface props {
  comment: Comment;
  authorId: string;
}

const Review = (props: props) => {
  const deleteReview = async (commentId: string | undefined) => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      fetch(`http://localhost:4466/api/v1/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log("comment successfully deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card maxW="8xl">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">{props.comment.authorId}</Heading>
                <p>Tenent</p>
              </Box>
            </Flex>
            <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex flexWrap="wrap" max-width="300px">
            <p>{props.comment.content}</p>
          </Flex>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            Like
          </Button>
          {props.comment.authorId == props.authorId ? (
            <Button onClick={() => deleteReview(props.comment.id)}>Delete</Button>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
export default Review;
