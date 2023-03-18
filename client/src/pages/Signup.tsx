import { Box, Heading, Link, Text } from "@chakra-ui/react";

import SignupForm from "components/SignupForm";

const Signup = () => {
  return (
    <Box w="40%" mx="auto">
      <Heading mb="20px">Signup</Heading>
      <Link href="/login" display="block" mb="20px">
        <Text as="u">Already have an account? Sign in</Text>
      </Link>
      <SignupForm />
    </Box>
  );
};

export default Signup;
