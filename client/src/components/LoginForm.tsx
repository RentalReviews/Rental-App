import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("email: ", email, "password: ", password);

    // TODO: Send login request to server
    const response = true;

    if (response) {
      // redirect to home page
      navigate("/");
    } else {
      // redirect to login page
      navigate("/login");
    }
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl id="username" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <IconButton aria-label={"toggle view password"} onClick={toggleShowPassword}>
              <Icon as={showPassword ? AiOutlineEyeInvisible : AiOutlineEye} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button type="submit" w="100%">
        Login
      </Button>
    </VStack>
  );
};

export default LoginForm;
