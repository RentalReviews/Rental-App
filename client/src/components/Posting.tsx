import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";

import { Map } from "./map";

import type { Post, Coordinate } from "types";
import type { MouseEventHandler } from "react";

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY || "";

export interface props {
  post: Post;
  deletePost: undefined | MouseEventHandler<HTMLButtonElement>;
}

const Posting = (props: props) => {
  const [coordinates, setCoordinates] = useState<Coordinate | null>(null);
  const navigate = useNavigate();

  let imageUrl: string | undefined = "";

  useState(() => {
    Geocode.setApiKey(MAP_API_KEY);
    Geocode.fromAddress(props.post.title).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCoordinates({ lat: lat, long: lng });
      },
      (error) => {
        console.log(`Could not get coordinates for posting ${props.post.id}`);
        if (import.meta.env.DEV) {
          console.log(error);
        }
      }
    );
  });

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
            src={imageUrl}
            alt={"property.imageAlt"}
            onClick={() =>
              navigate(`/posting/${props.post.id}`, {
                state: {
                  Post: props.post,
                  Coordinates: coordinates,
                },
              })
            }
            opacity={1}
            transition="0.5s ease"
          />
        </Box>
        {coordinates && (
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
            <Map coordinates={coordinates} className="map"></Map>
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
