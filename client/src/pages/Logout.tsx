import { Box, Heading, Button, Text, Link, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { clearUser, userSelector } from "redux/user";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const Logout = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: user?.refreshToken,
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
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("BEARER_TOKEN");
      } else {
        toast({
          title: "Error logging out",
          description: "There was an error logging out",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
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
