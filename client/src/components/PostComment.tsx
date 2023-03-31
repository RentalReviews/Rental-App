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
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { genericErrorHandler } from "utils";

import type { Comment } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const PostComment = (props: { comment: Comment }) => {
  const [commentAuthor, setCommentAuthor] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentInput = useRef<HTMLTextAreaElement>(null);

  const userData = JSON.parse(localStorage.getItem("USER") || JSON.stringify({}));
  const AuthToken = localStorage.getItem("BEARER_TOKEN") || "";

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getCommentAuthorDisplayName();
  });

  const updateComment = async (content: string) => {
    if (!AuthToken) return navigate("/login");
    if (content === "" || content === props.comment.content) return;

    try {
      const response = await fetch(`${API_URL}/comments/${props.comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({ content }),
      });
      const json = await response.json();

      if (response.ok) {
        navigate(0);
      } else {
        toast({
          title: "Error updating comment.",
          status: "error",
          description: json.message || "Something went wrong.",
          duration: 3000,
        });
      }
    } catch (err) {
      genericErrorHandler(err, toast);
    }
  };

  const deleteComment = async () => {
    if (!AuthToken) return navigate("/login");
    try {
      const response = await fetch(`${API_URL}/comments/${props.comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
      });
      console.log(AuthToken);
      const json = await response.json();

      if (response.ok) {
        navigate(0);
      } else {
        toast({
          title: "Error deleting comment.",
          status: "error",
          description: json.message || "Something went wrong.",
          duration: 3000,
        });
      }
    } catch (err) {
      genericErrorHandler(err, toast);
    }
  };

  const getCommentAuthorDisplayName = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${props.comment.authorId}`);
      const json = await response.json();
      setCommentAuthor(json.user.displayName);
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      setCommentAuthor("John Doe");
    }
  };

  return (
    <>
      <Card maxW="8xl" mb={3}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={commentAuthor} src="" />
              <Box>
                <Heading size="sm">
                  {commentAuthor + (userData.id == props.comment.authorId ? " (You)" : "")}
                </Heading>
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
          {userData.id == props.comment.authorId ? (
            <>
              <Button mr={2} onClick={onOpen}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={deleteComment}>
                Delete
              </Button>
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
              defaultValue={props.comment.content}
              ref={commentInput}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                updateComment(commentInput.current?.value || "");
                onClose();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostComment;
