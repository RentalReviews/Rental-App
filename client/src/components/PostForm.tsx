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
  Box,
  useToast,
  Text,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { genericErrorHandler } from "utils";
import type { Post } from "types";
import ResizeTextarea from "react-textarea-autosize";
import { Photo } from "types/Photo";
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
  // Keeps at least one image on the posting to show in user feed
  // const photoArray = ((props.post?.postPhotos.length || 0) < 1 ? [] : props.post?.postPhotos) || [];
  const photoArray = props.post?.postPhotos || [];
  const [inputFields, setInputFields] = useState(
    photoArray.map((photo) => {
      return { imageUrl: photo.url };
    })
  );
  const [formState, setFormState] = useState({
    title: props.post?.title || "",
    content: props.post?.content || "",
    rating: props.post?.rating || 1,
    imageUrl: props.post?.postPhotos || "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  const createPost = async () => {
    if (!AuthToken) return navigate("/login");
    if (formState.title === "" || formState.content === "" || inputFields.length <= 1) {
      toast({
        title: "Error updating post",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
      });
      return;
    }
    const imageUrlList = inputFields?.map((inputField) => {
      return { url: inputField["imageUrl"] };
    });

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
          postPhotos: imageUrlList,
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

  interface InputImageUrl {
    url: string | undefined;
    insidePost: boolean;
  }

  const onlyNewImagesList = (
    inputImages: InputImageUrl[] | undefined[],
    postUrls: Photo[],
    postId: string
  ) => {
    const result = [];
    const finalInputImages = inputImages || [];
    for (let i = 0; i < finalInputImages?.length; i++) {
      const image: Photo | undefined = postUrls.find(
        (post) => post.url === finalInputImages[i]?.url
      );
      if (!image && finalInputImages[i]?.url) {
        result.push({ url: finalInputImages[i]?.url, postId: postId });
      }
    }
    return result;
  };

  const toBeDeletedImagesList = (inputImages: InputImageUrl[] | undefined[], postUrls: Photo[]) => {
    const result: Photo[] = [];
    const inputImageUrlList = inputImages.map((inputImage) => inputImage?.url) || [null];
    const postImageUrlList = postUrls.map((postUrl) => postUrl.url);
    for (let i = 0; i < postImageUrlList.length; i++) {
      const image = inputImageUrlList.find((post) => post === postImageUrlList[i]);
      if (!image) {
        result.push({ url: postUrls[i].url, id: postUrls[i].id });
      }
    }
    return result;
  };

  const updatePost = async () => {
    if (!props.post) return;
    if (!AuthToken) return navigate("/login");
    if (formState.title === "" || formState.content === "" || inputFields.length <= 1) {
      toast({
        title: "Error updating post",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      let imageUrlList: InputImageUrl[] = inputFields
        ?.map((inputField) => {
          const flag = inputField.imageUrl || "";
          const result: InputImageUrl = {
            url: inputField["imageUrl"],
            insidePost: false,
          };
          if (flag) {
            return result;
          }
        })
        .filter((imageUrl) => imageUrl !== undefined) as InputImageUrl[];
      imageUrlList = imageUrlList ? imageUrlList : [];
      const postImages = props.post.postPhotos || [];
      const finalList = onlyNewImagesList(imageUrlList, postImages, props.post.id);
      const toBeDeletedImages = toBeDeletedImagesList(imageUrlList, postImages);

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
          postPhotos: finalList,
          deletePhotos: toBeDeletedImages,
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

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        imageUrl: "",
      },
    ]);
  };

  const removeInputFields = (
    index: number
  ): React.MouseEvent<HTMLButtonElement, MouseEvent> | void => {
    if (inputFields.length === 1) {
      toast({
        title: "Error",
        description: "Posting requires at least one image",
        status: "error",
        duration: 3000,
      });
      return;
    }
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const list = [...inputFields];
    list[index]["imageUrl"] = value;
    setInputFields(list);
  };

  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{IS_EDITING ? "Edit Post" : "Create new Post"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              <FormControl>
                <FormLabel htmlFor="title">
                  Title
                  <Text as="span" color="pink">
                    {" "}
                    *
                  </Text>
                </FormLabel>
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
                <Box display={"flex"}>
                  <FormLabel htmlFor="imageUrl">
                    Image URL
                    <Text as="span" color="pink">
                      {" "}
                      *
                    </Text>
                  </FormLabel>
                  <Button
                    onClick={addInputField}
                    color={"red.200"}
                    width={"30px"}
                    height={"30px"}
                    mb={"10px"}
                  >
                    <AddIcon w={2} h={2} />
                  </Button>
                  <Button ml={"10px"} mb={"5px"} width={"60px"} height={"30px"}>
                    <a target="_blank" href="http://www.imgur.com" rel="noreferrer">
                      Imgur
                    </a>
                  </Button>
                </Box>
                {inputFields.map((data, index) => {
                  return (
                    <Box key={index} display={"flex"} flexDirection={"row"}>
                      <Input
                        key={index}
                        value={inputFields[index].imageUrl}
                        type="text"
                        name="imageUrl"
                        onChange={(e) => {
                          handleChange(index, e);
                        }}
                        required
                        mb={"10px"}
                      />
                      <Button ml={"8px"} onClick={() => removeInputFields(index)}>
                        <MinusIcon />
                      </Button>
                    </Box>
                  );
                })}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="rating">
                  Rating
                  <Text as="span" color="pink">
                    {" "}
                    *
                  </Text>
                </FormLabel>
                <Input
                  type="number"
                  value={formState.rating}
                  name="rating"
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
                <FormLabel htmlFor="content">
                  Content
                  <Text as="span" color="pink">
                    {" "}
                    *
                  </Text>
                </FormLabel>
                <Textarea
                  placeholder="Write your review here..."
                  name="content"
                  resize={"vertical"}
                  overflow={"hidden"}
                  as={ResizeTextarea}
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
    </>
  );
};
