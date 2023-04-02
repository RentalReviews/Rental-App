import LoginForm from "components/LoginForm";

import { Box, Heading, Link, Text } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { userSelector } from "redux/user";

const Login = () => {
  const { user } = useSelector(userSelector);
  return (
    <Box w="40%" mx="auto">
      <Heading mb="20px">Login</Heading>
      {user ? (
        <Text>You are already logged in</Text>
      ) : (
        <>
          <LoginForm />
          <Link href="/signup" display="block" mt="50px">
            <Text as="u">Don&apos;t have an account? Sign up</Text>
          </Link>
        </>
      )}
    </Box>
  );
};

export default Login;
