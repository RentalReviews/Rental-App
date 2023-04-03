// import { useState } from "react";
// import {
//   Flex,
//   FormControl,
//   FormLabel,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
//   useToast,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { genericErrorHandler } from "utils";

// import { useSelector } from "react-redux";
// import { userSelector } from "redux/user";

// const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

// /**
//  *
//  * Form component for creating or editing a post. Used as a modal.
//  *
//  * @param props.post - The post to edit. If undefined, the form will be for creating a new post.
//  * @param props.isOpen - Provided via useDisclosure hook. Determines whether the modal is open or closed.
//  * @param props.onOpen - Provided via useDisclosure hook. Opens the modal.
//  * @param props.onClose - Provided via useDisclosure hook. Closes the modal.
//  *
//  */
// export const Profile = (props: { isOpen: boolean; onOpen: () => void; onClose: () => void }) => {
//   // don't need can get from user state
//   const AuthToken = localStorage.getItem("BEARER_TOKEN") || "";

//   const { user } = useSelector(userSelector);
//   // add imageUrl to user type, database,
//   const [formState, setFormState] = useState({
//     email: user?.email || "",
//     name: user?.displayName || "",
//   });
//   const navigate = useNavigate();
//   const toast = useToast();

//   /**
//    * Need to include imageUrl
//    * {
//    * id: '935f6b2f-9e8f-4558-866b-3bf08cba2c01',
//    * displayName: 'TestUser123!@gmail.com TestUser123!@gmail.com',
//    * email: 'TestUser123!@gmail.com',
//    * refreshToken: '',
//    * bearerToken: ''
//    * }
//    */

//   const submitProfile = async () => {
//     if (!AuthToken) return navigate("/login");
//     if (formState.email === "" || formState.name === "") return;

//     try {
//       const response = await fetch(`${API_URL}/users/${user?.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${AuthToken}`,
//         },
//         body: JSON.stringify({
//           email: formState.email,
//           name: formState.name,
//         }),
//       });

//       const json = await response.json();

//       if (response.ok) {
//         navigate(0);
//       } else {
//         toast({
//           title: "Error updating profile.",
//           status: "error",
//           description: json.message || "Something went wrong.",
//           duration: 3000,
//         });
//       }
//     } catch (err) {
//       genericErrorHandler(err, toast);
//     }
//     props.onClose();
//   };

//   return (
//     <Modal closeOnOverlayClick={true} isOpen={props.isOpen} onClose={props.onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Profile</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Flex direction="column" gap={4}>
//             <FormControl>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <Input
//                 name="email"
//                 type="text"
//                 value={formState.email}
//                 onChange={(e) => {
//                   setFormState({
//                     ...formState,
//                     email: e.target.value,
//                   });
//                 }}
//                 required
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="name">Name</FormLabel>
//               <Input
//                 type="text"
//                 name="name"
//                 value={formState.name}
//                 onChange={(e) => {
//                   setFormState({
//                     ...formState,
//                     name: e.target.value,
//                   });
//                 }}
//                 required
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel htmlFor="imageUrl">Profile Picture</FormLabel>
//               <Input
//                 name="imageUrl"
//                 value={formState.imageUrl}
//                 onChange={(e) => {
//                   setFormState({
//                     ...formState,
//                     imageUrl: e.target.value,
//                   });
//                 }}
//                 required
//               />
//             </FormControl>
//           </Flex>
//         </ModalBody>

//         <ModalFooter>
//           <Button mr={3} onClick={props.onClose}>
//             Close
//           </Button>
//           <Button colorScheme="blue" onClick={submitProfile}>
//             Submit
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };
