import { useState, useEffect } from "react";
import { Box, Flex, Text, Avatar, Button, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userSelector } from "redux/user";
import { ProfileForm } from "components/ProfileForm";

/**
 * The user profile component.
 */
const Profile = () => {
  // The URL of the API server.
  const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;
  const { user } = useSelector(userSelector);
  const AuthToken = user?.bearerToken || "";

  // The user object from the Redux store.

  // Whether or not the user is in editing mode.
  const [isEditing, setIsEditing] = useState(false);

  // The display name, email, avatar URL, bio, and body of the user.
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");

  // Fetches the user's profile data when the component mounts or when the user changes.
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${API_URL}/users/${user?.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
      });
      const userData = await response.json();
      setDisplayName(userData?.user.displayName);
      setEmail(userData?.user.email);
      setBio(userData?.user.bio || "");
      setAvatarUrl(userData?.user.avatarUrl || undefined);
    };
    fetchUser();
  }, []);

  return (
    <Box p={4}>
      {displayName && (
        <Flex direction="column" alignItems="center">
          <Heading as="h1" size="xl" my={4}>
            Welcome {displayName?.split(" ")[0]}
          </Heading>
          <Flex alignItems="flex-start">
            <Avatar size="2xl" name={displayName} src={avatarUrl} mr={4} />
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Email:
              </Text>
              <Text mb={4}>{email}</Text>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Display Name:
              </Text>
              <Text mb={4}>{displayName}</Text>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Bio:
              </Text>
              <Text>{bio}</Text>
            </Box>
          </Flex>
          <Button mt={4} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
          {displayName && avatarUrl && (
            <ProfileForm
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              userData={{ displayName, email }}
              profileData={{ avatarUrl, bio }}
            />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Profile;
