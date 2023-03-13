import { Box, Heading, Link, Text } from "@chakra-ui/react";

import SignupForm from "components/SignupForm";

const Signup = () => {
  return (
    <Box w="40%" mx="auto">
      <Heading mb="20px">Signup</Heading>
      <SignupForm />
      <Link href="/login" display="block" mt="50px">
        <Text as="u">Already have an account? Sign in</Text>
      </Link>
    </Box>
  );
};

export default Signup;
