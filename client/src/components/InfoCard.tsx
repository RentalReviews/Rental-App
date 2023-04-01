import { useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Image,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { StarIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { genericErrorHandler } from "utils";
import { Map } from "./map";

import type { Post, Coordinate } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const InfoCard = (props: { post: Post; coordinates?: Coordinate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [updatePostFormState, setUpdatePostFormState] = useState({
    title: props.post.title,
    content: props.post.content,
    rating: props.post.rating,
  });
  const newCommentRef = useRef<HTMLTextAreaElement>(null);

  const toast = useToast();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("USER") || JSON.stringify({}));
  const AuthToken = localStorage.getItem("BEARER_TOKEN") || "";

  const updatePost = async ({
    title,
    content,
    rating,
  }: {
    title: string;
    content: string;
    rating: number;
  }) => {
    if (!AuthToken) return navigate("/login");
    if (title === "" || content === "") return;

    try {
      const response = await fetch(`${API_URL}/postings/${props.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({ title, content, rating, postPhotos: props.post.postPhotos }),
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

  const addComment = async (content: string) => {
    if (!AuthToken) return;
    if (content === "") return;

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({
          content,
          authorId: userData.id,
          postId: props.post.id,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        navigate(0);
      } else {
        toast({
          title: "Error adding comment.",
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
    <div>
      <Box
        maxW="8xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Box p="6">
          <Box display={"flex"} justifyContent="space-around">
            <Box mt="2" display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
            </Box>

            <Box
              mt="2"
              fontSize={35}
              fontWeight="semibold"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              {props.post.title}
            </Box>

            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon key={i} color={i < props.post.rating ? "teal.500" : "gray.300"} />
                ))}
            </Box>
          </Box>
        </Box>
        <Center>
          <Wrap>
            <WrapItem>
              <Image
                boxSize="sm"
                maxH="s"
                src={
                  props.post.postPhotos[0]?.url ||
                  "https://imgs.search.brave.com/LJ9-GKNIeyw1YRkvjalT-KZ-wVjldzp4BRjFk_tgJ3U/rs:fit:1200:1200:1/g:ce/aHR0cDovL2NsaXBh/cnRzLmNvL2NsaXBh/cnRzLzhURy9FcjYv/OFRHRXI2cjdjLnBu/Zw"
                }
                alt={"property.imageAlt"}
                borderRadius="md"
              />
            </WrapItem>
            {props.coordinates && (
              <WrapItem>
                <Box maxW="4xl" borderWidth="1px" ml="10px" borderRadius="lg" overflow="hidden">
                  <Map coordinates={props.coordinates} className="bigmap"></Map>
                </Box>
              </WrapItem>
            )}
          </Wrap>
        </Center>
        <Box ml={10} mr={10} mb={10} mt={10}>
          {props.post.content}
        </Box>
        <Box display="flex">
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            Like
          </Button>
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiChat />}
            onClick={() => {
              setShowCommentForm(!showCommentForm);
            }}
          >
            Comment
          </Button>
          {props.post.authorId === (userData.id ? userData.id : "") && (
            <Button flex="1" variant="ghost" leftIcon={<EditIcon />} onClick={onOpen}>
              Edit
            </Button>
          )}
        </Box>
        <Box display={showCommentForm ? "block" : "none"} id="textArea">
          <Textarea m={3} placeholder="Add a comment" ref={newCommentRef} />
          <Button
            ml={3}
            mt={3}
            mb={3}
            onClick={(e) => {
              e.preventDefault();
              addComment(newCommentRef.current?.value || "");
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div>
                <label htmlFor="title">Title: </label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={props.post.title}
                  onChange={(e) => {
                    setUpdatePostFormState({
                      ...updatePostFormState,
                      title: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="image-url">Image URL: </label>
                <Input
                  type="text"
                  name="image-url"
                  defaultValue={props.post.postPhotos[0]?.url}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="rating">Rating: </label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  name="rating"
                  defaultValue={props.post.rating || 3}
                  onChange={(e) => {
                    setUpdatePostFormState({
                      ...updatePostFormState,
                      rating: Number(e.target.value),
                    });
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="content">Content: </label>
                <Input
                  type="text"
                  name="content"
                  defaultValue={props.post.content}
                  onChange={(e) => {
                    setUpdatePostFormState({
                      ...updatePostFormState,
                      content: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                updatePost(updatePostFormState);
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InfoCard;
