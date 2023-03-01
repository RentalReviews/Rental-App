import { Container } from "@chakra-ui/react";
import { Navbar } from "components/nav";
import React from "react";
const Property = (props: React.PropsWithChildren) => {
  return (
    <Container>
      <Navbar />
      {props.children}
    </Container>
  );
};
export default Property;
