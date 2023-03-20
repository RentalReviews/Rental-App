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
import { MouseEventHandler } from "react";
import { BiLike } from "react-icons/bi";
import type { Comment } from "../types/Comment";

interface props {
  comment: Comment;
  authorId: string;
  deleteReview: void | undefined | MouseEventHandler<HTMLButtonElement>;
}

const Review = (props: props) => {
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
          {props.authorId == props.comment.authorId ? (
            <Button onClick={props.deleteReview}>Delete</Button>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
export default Review;
