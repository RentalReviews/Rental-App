import { Container } from "@chakra-ui/react";
import { Navbar } from "components/nav";
import React from "react";
import InfoCard from "components/InfoCard";
import PropertyCard from "components/PropertyCard";
import Review from "components/review";
import SearchBar from "components/searchBar";
const Property = () => {
  return (
    <>
      <SearchBar />
      <InfoCard />
      <br />
      <Review />
    </>
  );
};
export default Property;
