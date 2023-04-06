import { useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Image,
  Textarea,
  useDisclosure,
  useToast,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { StarIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { PostForm } from "components/PostForm";
import { Map } from "components/map";
import { genericErrorHandler } from "utils";
import { userSelector } from "redux/user";

import type { Post } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const InfoCard = (props: { post: Post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const newCommentRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useSelector(userSelector);
  const latitude = props.post.latitude;
  const longitude = props.post.longitude;

  const toast = useToast();
  const navigate = useNavigate();

  const addComment = async (content: string) => {
    if (!user) return;
    if (content === "") return;

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.bearerToken}`,
        },
        body: JSON.stringify({
          content,
          authorId: user.id,
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

  const deletePost = async () => {
    if (!user || user.id !== props.post.authorId) return;
    try {
      const response = await fetch(`${API_URL}/postings/${props.post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.bearerToken}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        toast({
          title: "Error deleting post.",
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
            {latitude && longitude && (
              <WrapItem>
                <Box maxW="4xl" borderWidth="1px" ml="10px" borderRadius="lg" overflow="hidden">
                  <Map
                    coordinates={{
                      latitude,
                      longitude,
                    }}
                    className="bigmap"
                  ></Map>
                </Box>
              </WrapItem>
            )}
          </Wrap>
        </Center>
        <Box ml={10} mr={10} mb={10} mt={10}>
          {props.post.content}
        </Box>
        {user && (
          <>
            <Box display="flex">
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
              {props.post.authorId === (user?.id || "") && (
                <>
                  <Button flex="1" variant="ghost" leftIcon={<EditIcon />} onClick={onOpen}>
                    Edit
                  </Button>
                  <Button
                    flex="1"
                    variant="ghost"
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to delete this post?")) {
                        deletePost();
                      }
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
            <Box
              display={showCommentForm ? "flex" : "none"}
              id="textArea"
              flexDirection="column"
              p={5}
            >
              <Textarea placeholder="Add a comment..." ref={newCommentRef} />
              <Button
                size="sm"
                colorScheme="teal"
                mt={3}
                alignSelf="flex-end"
                w="100px"
                onClick={(e) => {
                  e.preventDefault();
                  addComment(newCommentRef.current?.value || "");
                }}
              >
                Add
              </Button>
            </Box>
          </>
        )}
      </Box>
      <PostForm post={props.post} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};

export default InfoCard;
