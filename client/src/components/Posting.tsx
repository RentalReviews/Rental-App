import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import type { Post } from "types";

export interface props {
  post: Post;
  deletePost: undefined | MouseEventHandler<HTMLButtonElement>;
}

const Posting = (props: props) => {
  const navigate = useNavigate();
  let imageUrl: string | undefined = "";

  try {
    imageUrl = props.post.postPhotos?.at(0)?.url || "";
  } catch (err) {
    console.log("issue getting image at index 0");
    imageUrl =
      "https://imgs.search.brave.com/LJ9-GKNIeyw1YRkvjalT-KZ-wVjldzp4BRjFk_tgJ3U/rs:fit:1200:1200:1/g:ce/aHR0cDovL2NsaXBh/cnRzLmNvL2NsaXBh/cnRzLzhURy9FcjYv/OFRHRXI2cjdjLnBu/Zw";
  }

  const userData = JSON.parse(localStorage.getItem("USER") || JSON.stringify({}));

  return (
    <Box maxW="sm" borderWidth="1px" margin="10px" borderRadius="lg" overflow="hidden">
      <img
        src={imageUrl}
        alt={"property.imageAlt"}
        onClick={() =>
          navigate("/property", {
            state: {
              Post: props.post,
            },
          })
        }
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {props.post.title}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < (props.post.rating || 1) ? "teal.500" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            0 comments
          </Box>
        </Box>
        {(userData.id || "") == props.post.authorId ? (
          <Button onClick={props.deletePost}>Delete</Button>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
export default Posting;
