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
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";

const Review = () => {
  return (
    <>
      <Card maxW="8xl">
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
                <p>Tenent</p>
              </Box>
            </Flex>
            <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
          </Flex>
        </CardHeader>
        <CardBody>
          <p>
            I want with this review to describe my personal experience after renting an apartment
            through MrLodge during the second semester of 2022. The price was decent regarding the
            service of MrLodge and the quality of the apartment. My apartment was at Perchastraße,
            in a recently constructed building. It was clean, safe, quiet, spacious, thermally
            insulated, very warm during freezing temperatures of December down to -14 Celsius during
            the night, cool during the warmer months of summer. It had a great view of a quiet green
            garden and a wonderful balcony. All home appliances and furniture were like new and well
            preserved.
          </p>
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
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default Review;
