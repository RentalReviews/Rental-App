import { useState } from "react";
import {
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
} from "@chakra-ui/react";
import { Profile } from "types/Profile";
import { useSelector } from "react-redux";
import { userSelector } from "redux/user";

interface UserData {
  displayName: string;
  email: string;
}

export const ProfileForm = (props: {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null | undefined;
  profileData: Profile;
}) => {
  const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;
  const AuthToken = localStorage.getItem("BEARER_TOKEN") || "";
  const [formState, setFormState] = useState({
    displayName: props.userData?.displayName || "",
    email: props.userData?.email || "",
    avatarUrl: props.profileData.avatarUrl || "",
    bio: props.profileData.bio || "",
  });
  const toast = useToast();
  const { user } = useSelector(userSelector);

  const handleSubmit = async () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(formState.email)) {
      throw new Error("Invalid email address");
    }
    if (!formState.avatarUrl) {
      throw new Error("Invalid email address");
    }
    try {
      // Update user display name and email.
      const userResponse = await fetch(`${API_URL}/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({ formState }),
      });

      if (!userResponse.ok) {
        throw new Error("Error updating user data");
      }

      // Update user profile data.
      const profileResponse = await fetch(`${API_URL}/users/profile/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthToken}`,
        },
        body: JSON.stringify({ formState }),
      });

      if (!profileResponse.ok) {
        throw new Error("Error updating profile data");
      }

      // Close modal and turn off editing mode.
      props.setIsEditing(false);

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
    } finally {
      window.location.reload();
    }
  };

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={props.isEditing}
      onClose={() => props.setIsEditing(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={formState.displayName}
            onChange={(e) => {
              setFormState({
                ...formState,
                displayName: e.target.value,
              });
            }}
            mb={4}
            placeholder="Display Name"
          />
          <Input
            value={formState.email}
            onChange={(e) => {
              setFormState({
                ...formState,
                email: e.target.value,
              });
            }}
            mb={4}
            placeholder="Email"
          />
          <Input
            value={formState.avatarUrl}
            onChange={(e) => {
              setFormState({
                ...formState,
                avatarUrl: e.target.value,
              });
            }}
            mb={4}
            placeholder="Avatar URL"
          />
          <Textarea
            value={formState.bio}
            onChange={(e) => {
              setFormState({
                ...formState,
                bio: e.target.value,
              });
            }}
            mb={4}
            placeholder="Bio"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
            Save
          </Button>
          <Button variant="ghost" onClick={() => props.setIsEditing(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
