import React, { useState } from "react";

import {
  Input,
  FormLabel,
  FormControl,
  VStack,
  Button,
  useToast,
  FormErrorMessage,
  InputRightElement,
  IconButton,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
        <Input
          type="text"
          id="firstName"
          placeholder="John"
          value={formValues.firstName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          id="lastName"
          placeholder="Doe"
          value={formValues.lastName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          id="email"
          placeholder="john@email.com"
          value={formValues.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton aria-label={"toggle view password"} onClick={toggleShowPassword}>
              <Icon as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <InputRightElement>
            <IconButton aria-label={"toggle view password"} onClick={toggleShowConfirmPassword}>
              <Icon as={showConfirmPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button type="submit" w="100%">
        Create Account
      </Button>
    </VStack>
  );
};

export default SignupForm;
