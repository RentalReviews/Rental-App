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
                    <label htmlFor="">Title: </label>
                    <Input
                      type="text"
                      onChange={(e) =>
                        props.setPost({
                          address: e.target.value,
                          imageUrl: props.post.imageUrl,
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
                          address: props.post.address,
                          imageUrl: e.target.value,
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
                          address: props.post.address,
                          imageUrl: props.post.imageUrl,
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
                          address: props.post.address,
                          imageUrl: props.post.imageUrl,
                          rating: props.post.rating,
                          caption: e.target.value,
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
