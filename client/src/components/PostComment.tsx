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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";

import type { Comment } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

interface props {
  comment: Comment;
  authorId: string;
  deleteReview: MouseEventHandler<HTMLButtonElement> | undefined;
  setComment: Dispatch<SetStateAction<Comment>>;
  editComment: (id: string) => Promise<void>;
}

const PostComment = (props: props) => {
  const [commentAuthor, setCommentAuthor] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = JSON.parse(localStorage.getItem("USER") || JSON.stringify({}));
  const handleModal = () => {
    onClose();
    props.editComment(props.comment.id || "");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setComment({
      authorId: props.comment.authorId,
      content: e.target.value,
      createdAt: props.comment.createdAt,
      id: props.comment.id,
      postId: props.comment.postId,
      updatedAt: new Date(),
    });
  };

  const getCommentAuthorDisplayName = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${props.authorId}`);
      const json = await response.json();
      setCommentAuthor(json.user.displayName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommentAuthorDisplayName();
  });

  return (
    <>
      <Card maxW="8xl" mb={3}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                {/* Change this to display name from locally stored user object */}
                <Heading size="sm">{commentAuthor}</Heading>
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
          {userData.id != props.comment.authorId ? (
            <Button flex="1" width={10} variant="ghost" leftIcon={<BiLike />}>
              Like
            </Button>
          ) : (
            <></>
          )}
          {userData.id == props.comment.authorId ? (
            <>
              <Button left={40} mr={10} flex={1} variant="ghost" leftIcon={<BiLike />}>
                Like
              </Button>
              <Button mr={2} onClick={onOpen}>
                Edit
              </Button>
              <Button onClick={props.deleteReview}>Delete</Button>
            </>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Edit your comment"
              name="myName"
              onChange={(e) => handleOnChange(e)}
              defaultValue={props.comment.content}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => handleModal()}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostComment;
