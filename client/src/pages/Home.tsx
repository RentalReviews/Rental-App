import { Box, Text, Heading } from "@chakra-ui/react";
import PropertyCard from "components/PropertyCard";
import SearchBar from "components/searchBar";
import { loremIpsum } from "lorem-ipsum";

const Home = () => {
  return (
    <>
      <SearchBar />
      <PropertyCard />
    </>
  );
};

export default Home;
