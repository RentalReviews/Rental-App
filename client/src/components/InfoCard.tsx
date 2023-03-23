import { Dispatch, SetStateAction, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { StarIcon, EditIcon } from "@chakra-ui/icons";
import "styles/userHome.css";
import { genericErrorHandler } from "utils";

import type { Comment, Post } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

interface props {
  post: Post;
  comment: Comment;
  setComment: Dispatch<SetStateAction<Comment>>;
  updateComments: () => void;
}

const InfoCard = (props: props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const userData = JSON.parse(localStorage.getItem("USER") || JSON.stringify({}));
  const toast = useToast();

  const [post, setPost] = useState<Post>({
    authorId: props.post.authorId,
    comments: props.post.comments,
    content: props.post.content,
    createdAt: props.post.createdAt,
    id: props.post.id,
    postPhotos: props.post.postPhotos,
    published: props.post.published,
    title: props.post.title,
    updatedAt: props.post.updatedAt,
    rating: props.post.rating,
  });

  const handleModal = () => {
    onClose();
    editPost();
  };

  const editPost = () => {
    const token = "Bearer " + localStorage.getItem("BEARER_TOKEN")?.toString();
    try {
      fetch(`${API_URL}/postings/${post.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: post.id,
          title: post.title,
          postPhotos: post.postPhotos,
          rating: post.rating,
          content: post.content,
          authorId: post.authorId,
        }),
      });
    } catch (err) {
      genericErrorHandler(err, toast);
    } finally {
      setTimeout(() => alert("timeout"), 5000);
      window.location.assign("/");
    }
  };

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
        <div id="posts">
          <Center>
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
          </Center>
          <Box ml={10} mr={10} mb={10} mt={10}>
            {props.post.content}
          </Box>
        </div>
        <Box display="flex">
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />} onClick={toggleCommentForm}>
            Comment
          </Button>
          {props.post.authorId === (userData.id ? userData.id : "") && (
            <Button flex="1" variant="ghost" leftIcon={<EditIcon />} onClick={onOpen}>
              Edit
            </Button>
          )}
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
              onChange={(e) =>
                props.setComment({
                  authorId: props.post.authorId,
                  content: e.target.value,
                  createdAt: new Date(),
                  id: props.comment.id,
                  postId: props.post.id,
                  updatedAt: new Date(),
                })
              }
            />
            <Button ml={3} mt={3} mb={3} type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Box>
      {/* Pop ups can be placed outside of shown component */}
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label htmlFor="">Rental Address: </label>
                <Input
                  type="text"
                  onChange={(e) =>
                    setPost({
                      authorId: post.authorId,
                      comments: props.post.comments,
                      content: post.content,
                      createdAt: props.post.createdAt,
                      id: post.id,
                      postPhotos: post.postPhotos,
                      published: props.post.published,
                      title: e.target.value,
                      updatedAt: props.post.updatedAt,
                      rating: post.rating,
                    })
                  }
                  defaultValue={post.title}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Image URL: </label>
                <Input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) =>
                    setPost({
                      authorId: post.authorId,
                      comments: props.post.comments,
                      content: post.content,
                      createdAt: props.post.createdAt,
                      id: post.id,
                      postPhotos: [{ url: e.target.value }],
                      published: props.post.published,
                      title: post.title,
                      updatedAt: props.post.updatedAt,
                      rating: post.rating,
                    })
                  }
                  defaultValue={post.postPhotos[0]?.url}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Rating: </label>
                <Input
                  type="number"
                  name=""
                  id=""
                  onChange={(e) =>
                    setPost({
                      authorId: post.authorId,
                      comments: props.post.comments,
                      content: post.content,
                      createdAt: props.post.createdAt,
                      id: post.id,
                      postPhotos: post.postPhotos,
                      published: props.post.published,
                      title: post.title,
                      updatedAt: props.post.updatedAt,
                      rating: Number(e.target.value),
                    })
                  }
                  defaultValue={post.rating ? post.rating : 3}
                  required
                />
              </div>
              <div>
                <label htmlFor="">Caption: </label>
                <Input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) =>
                    setPost({
                      authorId: post.authorId,
                      comments: props.post.comments,
                      content: e.target.value,
                      createdAt: props.post.createdAt,
                      id: post.id,
                      postPhotos: post.postPhotos,
                      published: props.post.published,
                      title: post.title,
                      updatedAt: props.post.updatedAt,
                      rating: post.rating,
                    })
                  }
                  defaultValue={post.content}
                />
              </div>
            </form>
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
    </div>
  );
};
export default InfoCard;
