import {
  Button,
  Center,
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

const LoginForm = () => {
  const width = "40%";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await loginUser({
  //       variables: {
  //         email,
  //         password,
  //       },
  //     });
  //     localStorage.setItem("token", data.login.token);
  //     history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    <VStack as="form" spacing={4} onSubmit={console.log}>
      <Center w="100%">
        <FormControl id="username" w={width}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
      </Center>
      <Center w="100%">
        <FormControl id="password" w={width}>
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
      </Center>
      <Button type="submit" w={width}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginForm;
