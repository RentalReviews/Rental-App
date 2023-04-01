import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { IoMenu, IoClose, IoSunny, IoMoon } from "react-icons/io5";
import { useSelector } from "react-redux";
import { userSelector } from "redux/user";
import NavLink from "./NavLink";

const Navbar = () => {
  const { user } = useSelector(userSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const Links: Array<{ name: string; href: string }> = [
    { name: "Home", href: "/" },
    user ? { name: "Logout", href: "/logout" } : { name: "Login", href: "/login" },
  ];

  return (
    <>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} gap={1}>
        <IconButton
          size={"md"}
          icon={isOpen ? <IoClose /> : <IoMenu />}
          aria-label={"Open Menu"}
          display={{ lg: "none" }}
          onClick={isOpen ? onClose : onOpen}
          p={"auto"}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box as={RouterLink} to={"/"}>
            Logo Here
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", lg: "flex" }}>
            {Links.map((link) => (
              <NavLink
                key={link.name}
                isActive={location.pathname === link.href}
                name={link.name}
                href={link.href}
              />
            ))}
          </HStack>
        </HStack>
        <HStack as={"nav"} spacing={4} display={{ base: "none", lg: "flex" }}>
          <Avatar name={user?.displayName} />
          <IconButton
            onClick={toggleColorMode}
            size={"md"}
            icon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
            aria-label={"Toggle Color Mode"}
          />
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ lg: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink
                key={link.name}
                isActive={location.pathname === link.href}
                name={link.name}
                href={link.href}
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

export default Navbar;
