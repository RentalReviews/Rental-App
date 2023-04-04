import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Map } from "./map";

import type { Post } from "types";

const NO_THUMBNAIL_URL =
  "https://imgs.search.brave.com/LJ9-GKNIeyw1YRkvjalT-KZ-wVjldzp4BRjFk_tgJ3U/rs:fit:1200:1200:1/g:ce/aHR0cDovL2NsaXBh/cnRzLmNvL2NsaXBh/cnRzLzhURy9FcjYv/OFRHRXI2cjdjLnBu/Zw";

const Posting = (props: { post: Post }) => {
  const navigate = useNavigate();

  const thumbnailImage: string = props.post.postPhotos[0]?.url || NO_THUMBNAIL_URL;

  const latitude = props.post.latitude;
  const longitude = props.post.longitude;

  return (
    <Box maxW="sm" borderWidth="1px" margin="10px" borderRadius="lg" overflow="hidden">
      <Box position="relative" my={3}>
        <Box
          maxW="sm"
          maxH="sm"
          borderWidth="1px"
          margin="10px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            className="profile-img"
            src={thumbnailImage}
            maxHeight={"225px"}
            width={"auto"}
            alt={`Thumbnail for ${props.post.title}`}
            onClick={() =>
              navigate(`/posting/${props.post.id}`, {
                state: {
                  Post: props.post,
                },
              })
            }
            opacity={1}
            transition="0.5s ease"
          />
        </Box>
        {latitude && longitude && (
          <Box
            position="absolute"
            boxSize="100px"
            transition="0.5s ease"
            opacity={1}
            className="overlay-text"
            maxW="sm"
            borderWidth="1px"
            margin="10px"
            borderRadius="lg"
            border="2pt solid white"
            overflow="hidden"
            top="-4%"
            left="69%"
          >
            <Map coordinates={{ latitude, longitude }} className="map"></Map>
          </Box>
        )}
      </Box>
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
            {props.post.comments.length} comments
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Posting;
