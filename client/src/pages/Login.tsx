import LoginForm from "components/LoginForm";

import { Box, Heading, Link, Text } from "@chakra-ui/react";

const Login = () => {
  return (
    <Box w="40%" mx="auto">
      <Heading mb="20px">Login</Heading>
      <LoginForm />

      <Link href="/signup" display="block" mt="50px">
        <Text as="u">Don&apos;t have an account? Sign up</Text>
      </Link>
    </Box>
  );
};

export default Login;
