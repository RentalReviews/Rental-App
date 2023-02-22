import { Box, Text, Heading } from "@chakra-ui/react";
import { loremIpsum } from "lorem-ipsum";

const Home = () => {
  return (
    <>
      <Box textAlign={"center"} my={5}>
        <Heading as={"h1"} fontSize={{ base: "4xl", md: "6xl" }}>
          This is the Home page
        </Heading>
      </Box>
      <Box textAlign={"center"}>
        <Text fontSize={"xl"}>{loremIpsum({ count: 2, units: "paragraphs" })}</Text>
      </Box>
    </>
  );
};

export default Home;
