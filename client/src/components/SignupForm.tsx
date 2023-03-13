import React, { useState } from "react";

import { Input, FormLabel, FormControl, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, confirmPassword);

    // TODO: Add validation
    // TODO: Add API call

    const isAccountCreated = true; // get this from API call

    if (isAccountCreated) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  return (
    <VStack as="form" spacing={4} onSubmit={onSubmit}>
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit" w="100%">
        Create Account
      </Button>
    </VStack>
  );
};

export default SignupForm;
