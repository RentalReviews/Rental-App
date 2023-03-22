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
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { BiLike } from "react-icons/bi";
import type { Comment } from "../types/Comment";

interface props {
  comment: Comment;
  authorId: string;
  deleteReview: MouseEventHandler<HTMLButtonElement> | undefined;
  setComment: Dispatch<SetStateAction<Comment>>;
  editComment: (id: string) => Promise<void>; //MouseEventHandler<HTMLButtonElement> | undefined;
}

const Review = (props: props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = JSON.parse(localStorage.getItem("USER")!);
  const handleModal = () => {
    onClose();
    props.editComment(props.comment.id!);
  };
  return (
    <>
      <Card maxW="8xl">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                {/* Change this to display name from locally stored user object */}
                <Heading size="sm">{userData.displayName}</Heading>
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
          {userData.id == props.comment.authorId ? (
            <>
              <Button onClick={onOpen}>Edit</Button>
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
              onChange={(e: any) => props.setComment(e.target.value)}
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
export default Review;
