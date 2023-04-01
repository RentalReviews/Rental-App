import { Box, Heading, Button, Text, Link, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { clearUser } from "redux/user";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const Logout = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);

  const handleLogout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: user.refreshToken,
      }),
    });

    if (response.ok) {
      dispatch(clearUser());
      redirect("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } else {
      console.log("Error logging out");
      toast({
        title: "Error logging out",
        description: "There was an error logging out",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="40%" mx="auto">
      <Heading mb="20px">Logout</Heading>
      {user ? (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <Link href="/" display="block" mt="50px">
            <Text as="u">Return to homepage</Text>
          </Link>
        </>
      ) : (
        <Text>You are not logged in</Text>
      )}
    </Box>
  );
};

export default Logout;
