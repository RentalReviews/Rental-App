import { Container } from "@chakra-ui/react";

import Navbar from "components/nav/Navbar";

const BasePage = (props: React.PropsWithChildren) => {
  return (
    <Container maxW="container.xl">
      <Navbar />

      {props.children}
    </Container>
  );
};

export default BasePage;
