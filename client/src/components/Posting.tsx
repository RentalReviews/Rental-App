import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Post } from "types/Post";

export interface props {
  post: Post;
}

const Posting = (props: props) => {
  const navigate = useNavigate();

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      margin="10px"
      borderRadius="lg"
      overflow="hidden"
      onClick={() =>
        navigate("/property", {
          state: {
            Post: props.post,
          },
        })
      }
    >
      <img src={props.post.imageUrl} alt={"property.imageAlt"} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
          {props.post.address}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < props.post.rating ? "teal.500" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            0 comments
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Posting;
