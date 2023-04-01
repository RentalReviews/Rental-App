import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { genericErrorHandler } from "utils";

import type { Post } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

/**
 *
 * Form component for creating or editing a post. Used as a modal.
 *
 * @param props.post - The post to edit. If undefined, the form will be for creating a new post.
 * @param props.isOpen - Provided via useDisclosure hook. Determines whether the modal is open or closed.
 * @param props.onOpen - Provided via useDisclosure hook. Opens the modal.
 * @param props.onClose - Provided via useDisclosure hook. Closes the modal.
 *
 */
export const PostForm = (props: {
  post?: Post;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const IS_EDITING = props.post !== undefined;
  const AuthToken = localStorage.getItem("BEARER_TOKEN") || "";

  const [formState, setFormState] = useState({
    title: props.post?.title || "",
    content: props.post?.content || "",
    rating: props.post?.rating || 1,
    imageUrl: props.post?.postPhotos[0]?.url || "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const createPost = async () => {
    if (!AuthToken) return navigate("/login");
    if (formState.title === "" || formState.content === "") return;

    try {
      const response = await fetch(`${API_URL}/postings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({
          title: formState.title,
          content: formState.content,
          rating: formState.rating,
          postPhotos: [{ url: formState.imageUrl }],
        }),
      });

      const json = await response.json();

      if (response.ok) {
        navigate(0);
      } else {
        toast({
          title: "Error creating post",
          description: json.message || "Something went wrong.",
          status: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      genericErrorHandler(err, toast);
    }
  };

  const updatePost = async () => {
    if (!props.post) return;
    if (!AuthToken) return navigate("/login");
    if (formState.title === "" || formState.content === "") return;

    try {
      const response = await fetch(`${API_URL}/postings/${props.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({
          title: formState.title,
          content: formState.content,
          rating: formState.rating,
          postPhotos: [
            {
              ...props.post.postPhotos[0],
              url: formState.imageUrl,
            },
          ],
        }),
      });

      const json = await response.json();

      if (response.ok) {
        navigate(0);
      } else {
        toast({
          title: "Error updating post.",
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
    <Modal closeOnOverlayClick={true} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{IS_EDITING ? "Edit Post" : "Create new Post"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={4}>
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                name="title"
                type="text"
                value={formState.title}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    title: e.target.value,
                  });
                }}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="image-url">Image URL</FormLabel>
              <Input
                type="text"
                name="image-url"
                value={formState.imageUrl}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    imageUrl: e.target.value,
                  });
                }}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="rating">Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                value={formState.rating}
                min={1}
                max={5}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    rating: Number(e.target.value),
                  });
                }}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea
                placeholder="Write your review here..."
                name="content"
                value={formState.content}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    content: e.target.value,
                  });
                }}
                required
              />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={(e) => {
              e.preventDefault();
              if (!IS_EDITING) {
                createPost();
              } else {
                updatePost();
              }
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
