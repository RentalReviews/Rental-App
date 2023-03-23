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
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
      const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await loginRes.json();
      if (import.meta.env.DEV) console.log(json);

      localStorage.setItem("REFRESH_TOKEN", json.refreshToken);
      localStorage.setItem("BEARER_TOKEN", json.token);

      const getUserInfo = async () => {
        try {
          const response = await fetch(`${API_URL}/users/${email}`);
          const json = await response.json();
          return json.user;
        } catch (err) {
          console.log(err);
        }
      };

      const userData = await getUserInfo();
      console.log(userData);
      localStorage.setItem(
        "USER",
        JSON.stringify({
          email: userData.email,
          displayName: userData.displayName,
          id: userData.id,
          role: userData.role,
        })
      );

      if (loginRes.ok) {
        navigate("/");
        toast({
          title: "Success",
          description: "You have successfully logged in.",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: json.message,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
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
