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
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { StarIcon } from "@chakra-ui/icons";
import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import "styles/userHome.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}/api/v1`
  : "";

interface props {
  post: Post;
  comment: Comment;
  setComment: Dispatch<SetStateAction<Comment>>;
  updateComments: () => void;
}

const InfoCard = (props: props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [post, setPost] = useState<Post>({
    id: props.post.postPhotos![0].postId,
    title: props.post.title,
    postPhotos: props.post.postPhotos,
    rating: props.post.rating,
    content: props.post.content,
    authorId: props.post.authorId,
  });

  console.log(props.post);

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
      console.log(err);
    } finally {
      console.log(window.location.hostname);
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

        <Box w="100%" mt="3" fontWeight="semibold" as="h1" lineHeight="tight" noOfLines={1}>
          {props.post.title}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < props.post.rating! ? "teal.500" : "gray.300"} />
            ))}
        </Box>
      </Box>
      <div id="posts">
        <Box>{props.post.content}</Box>

        <Image
          boxSize="sm"
          maxH="s"
          src={
            props.post.postPhotos![0].url
              ? props.post.postPhotos![0].url
              : "https://imgs.search.brave.com/LJ9-GKNIeyw1YRkvjalT-KZ-wVjldzp4BRjFk_tgJ3U/rs:fit:1200:1200:1/g:ce/aHR0cDovL2NsaXBh/cnRzLmNvL2NsaXBh/cnRzLzhURy9FcjYv/OFRHRXI2cjdjLnBu/Zw"
          }
          alt={"property.imageAlt"}
          borderRadius="md"
        />
      </div>

      <Box display="flex">
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />} onClick={toggleCommentForm}>
          Comment
        </Button>
        {props.post.authorId === JSON.parse(localStorage.getItem("USER")!).id && (
          <Button flex="1" variant="ghost" onClick={onOpen}>
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
                id: props.comment.id,
                postId: props.post.id,
              })
            }
          />
          <Button type="submit">Add</Button>
        </Box>
      </form>
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
                      id: post.id,
                      title: e.target.value,
                      postPhotos: post.postPhotos,
                      rating: post.rating,
                      content: post.content,
                      authorId: post.authorId,
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
                      id: post.id,
                      title: post.title,
                      postPhotos: [{ url: e.target.value }],
                      rating: post.rating,
                      content: post.content,
                      authorId: post.authorId,
                    })
                  }
                  defaultValue={post.postPhotos![0].url}
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
                      id: post.id,
                      title: post.title,
                      postPhotos: post.postPhotos,
                      rating: Number(e.target.value),
                      content: post.content,
                      authorId: post.authorId,
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
                      id: post.id,
                      title: post.title,
                      postPhotos: post.postPhotos,
                      rating: post.rating,
                      content: e.target.value,
                      authorId: post.authorId,
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
    </Box>
  );
};
export default InfoCard;
