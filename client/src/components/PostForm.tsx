import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { genericErrorHandler } from "utils";

import type { Post } from "types";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

export const PostForm = (props: { post?: Post }) => {
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

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton _expanded={{ bg: "teal.500", color: "white" }}>
                  <Box as="span" flex="1" textAlign="left">
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <div>
                        <AddIcon fontSize="12px" /> New post
                      </div>
                    )}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <form>
                  <div>
                    <label htmlFor="title">Title: </label>
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
                  </div>
                  <div>
                    <label htmlFor="image-url">Image URL: </label>
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
                  </div>
                  <div>
                    <label htmlFor="rating">Rating: </label>
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
                  </div>
                  <div>
                    <label htmlFor="content">Content: </label>
                    <Input
                      type="text"
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
                  </div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (!IS_EDITING) {
                        createPost();
                      }
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};
