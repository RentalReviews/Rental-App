import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import type { Post } from "../types/Post";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

interface props {
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  updatePosts: () => void;
}

export const PostForm = (props: props) => {
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.updatePosts();
                  }}
                >
                  <div>
                    <label htmlFor="">Rental Address: </label>
                    <Input
                      type="text"
                      onChange={(e) =>
                        props.setPost({
                          authorId: props.post.authorId,
                          comments: props.post.comments,
                          content: props.post.content,
                          createdAt: props.post.createdAt,
                          id: props.post.id,
                          postPhotos: props.post.postPhotos,
                          published: props.post.published,
                          title: e.target.value,
                          updatedAt: props.post.updatedAt,
                          rating: props.post.rating,
                        })
                      }
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
                        props.setPost({
                          authorId: props.post.authorId,
                          comments: props.post.comments,
                          content: props.post.content,
                          createdAt: props.post.createdAt,
                          id: props.post.id,
                          postPhotos: [{ url: e.target.value }],
                          published: props.post.published,
                          title: props.post.title,
                          updatedAt: props.post.updatedAt,
                          rating: props.post.rating,
                        })
                      }
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
                        props.setPost({
                          authorId: props.post.authorId,
                          comments: props.post.comments,
                          content: e.target.value,
                          createdAt: props.post.createdAt,
                          id: props.post.id,
                          postPhotos: props.post.postPhotos,
                          published: props.post.published,
                          title: props.post.title,
                          updatedAt: props.post.updatedAt,
                          rating: Number(e.target.value),
                        })
                      }
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
                        props.setPost({
                          authorId: props.post.authorId,
                          comments: props.post.comments,
                          content: e.target.value,
                          createdAt: props.post.createdAt,
                          id: props.post.id,
                          postPhotos: props.post.postPhotos,
                          published: props.post.published,
                          title: props.post.title,
                          updatedAt: props.post.updatedAt,
                          rating: props.post.rating,
                        })
                      }
                    />
                  </div>
                  <Button type="submit">OK</Button>
                </form>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};
