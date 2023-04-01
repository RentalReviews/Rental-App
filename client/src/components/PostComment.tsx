import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
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
  Text,
} from "@chakra-ui/react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { genericErrorHandler } from "utils";

import type { Comment } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const PostComment = (props: { comment: Comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentInput = useRef<HTMLTextAreaElement>(null);

  const userData = JSON.parse(localStorage.getItem("USER") || JSON.stringify({}));
  const AuthToken = localStorage.getItem("BEARER_TOKEN") || "";

  const navigate = useNavigate();
  const toast = useToast();

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

  return (
    <>
      <Card maxW="8xl" mb={3}>
        <CardHeader>
          <Flex gap={3}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={props.comment.author.displayName} src="" />
              <Box>
                <Heading size="sm">
                  {props.comment.author.displayName +
                    (userData.id == props.comment.authorId ? " (You)" : "")}
                </Heading>
                <p>Tenent</p>
              </Box>
            </Flex>

            {userData.id == props.comment.authorId ? (
              <>
                <IconButton icon={<BiEdit />} aria-label="Edit Comment" onClick={onOpen} />
                <IconButton
                  icon={<BiTrash />}
                  colorScheme="red"
                  aria-label="Delete Comment"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteComment();
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </Flex>
        </CardHeader>

        <CardBody>
          <Text>{props.comment.content}</Text>
          <Text fontSize="sm" color="gray.500" align="right">{`Commented on ${new Date(
            props.comment.createdAt
          ).toLocaleTimeString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}`}</Text>
        </CardBody>
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
