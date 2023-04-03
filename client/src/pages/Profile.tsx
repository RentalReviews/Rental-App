import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userSelector } from "redux/user";

/**
 * The user profile component.
 */
const Profile = () => {
  // The URL of the API server.
  const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

  // The user object from the Redux store.
  const { user } = useSelector(userSelector);

  // Whether or not the user is in editing mode.
  const [isEditing, setIsEditing] = useState(false);

  // The display name, email, avatar URL, bio, and body of the user.
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [body, setBody] = useState("");

  // A toast object used to show success or error messages.
  const toast = useToast();

  // Fetches the user's profile data when the component mounts or when the user changes.
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${API_URL}/users/profile/${user?.id}`);
      const userData = await response.json();
      setBio(userData?.profile?.bio || "");
      setAvatarUrl(userData?.profile?.avatarUrl || "");
      setBody(userData?.body || "");
    };

    const fetchUser = async () => {
      const response = await fetch(`${API_URL}/users/${user?.id}`);
      const userData = await response.json();
      setDisplayName(userData?.user.displayName);
      setEmail(userData?.user.email);
    };

    fetchProfile();
    fetchUser();
  }, [user]);

  // Submits the updated user profile data to the server.
  const handleSubmit = async () => {
    try {
      // Update user display name and email.
      const userResponse = await fetch(`${API_URL}/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName, email }),
      });

      if (!userResponse.ok) {
        throw new Error("Error updating user data");
      }

      // Update user profile data.
      const profileResponse = await fetch(`${API_URL}/users/profile/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, avatarUrl, body }),
      });

      if (!profileResponse.ok) {
        throw new Error("Error updating profile data");
      }

      // Close modal and turn off editing mode.
      setIsEditing(false);

      // Show success toast.
      toast({
        title: "Profile Updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Show error toast.
      toast({
        title: "Error",
        description: "Unable to update profile",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
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
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                mb={4}
                placeholder="Display Name"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
                placeholder="Email"
              />
              <Input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                mb={4}
                placeholder="Avatar URL"
              />
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                mb={4}
                placeholder="Bio"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default Profile;
