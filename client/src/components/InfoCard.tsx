import { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { StarIcon } from "@chakra-ui/icons";
const InfoCard = () => {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "2445 Guilford dr, Abbotsford BC ",
    formattedPrice: "$2,900",
    reviewCount: 20,
    rating: 4,
  };

  return (
    <Box maxW="8xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box w="100%" mt="3" fontWeight="semibold" as="h1" lineHeight="tight" noOfLines={1}>
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / mo
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon key={i} color={i < property.rating ? "teal.500" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
      <div>
        <img src={property.imageUrl} alt={property.imageAlt} />
      </div>
    </Box>
  );
};
export default InfoCard;
