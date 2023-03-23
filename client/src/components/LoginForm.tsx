import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import type { RefreshToken } from "types/RefreshToken";
import { genericErrorHandler } from "utils";

const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;

const LoginForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((response) => {
        response.json().then((data) => {
          localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
          localStorage.setItem("BEARER_TOKEN", data.token);
          const token = "Bearer " + localStorage.getItem("REFRESH_TOKEN")?.toString();
          const decoded: RefreshToken = jwt_decode(token);
          localStorage.setItem(
            "USER",
            JSON.stringify({
              displayName: decoded.name,
              email: decoded.email,
              id: decoded.id,
            })
          );
          if (response.ok) {
            navigate("/");
            toast({
              title: "Logged in",
              description: "You are online.",
              status: "success",
              duration: 10000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error",
              description: data.message || "Server error",
              status: "error",
              duration: 10000,
              isClosable: true,
            });
          }
        });
      });
    } catch (error) {
      genericErrorHandler(error, toast);
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
