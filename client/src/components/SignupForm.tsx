import React, { useState } from "react";

import {
  Input,
  FormLabel,
  FormControl,
  VStack,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);

    // TODO: Add validation
    // TODO: Add API call

    const isAccountCreated = true; // get this from API call

    if (isAccountCreated) {
      navigate("/");
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      navigate("/signup");
      toast({
        title: "Account not created",
        description: "There was an error when creating your account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack as="form" spacing={4} onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input type="text" id="firstName" value={formValues.firstName} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" id="lastName" value={formValues.lastName} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" id="email" value={formValues.email} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" id="password" value={formValues.password} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          id="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" w="100%">
        Create Account
      </Button>
    </VStack>
  );
};

export default SignupForm;
