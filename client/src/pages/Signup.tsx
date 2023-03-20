import { Box, Heading, Link, Text } from "@chakra-ui/react";

import SignupForm from "components/SignupForm";

const Signup = () => {
  return (
    <Box w="40%" mx="auto" mb="30px">
      <Heading>Signup</Heading>
      <Link href="/login" display="block" my="30px">
        <Text as="u">Already have an account? Sign in</Text>
      </Link>
      <SignupForm />
    </Box>
  );
};

export default Signup;
