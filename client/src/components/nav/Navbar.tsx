import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  Stack,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { IoMenu, IoClose, IoSunny, IoMoon } from "react-icons/io5";
import { useSelector } from "react-redux";
import { userSelector } from "redux/user";
import NavLink from "./NavLink";
import { MouseEventHandler, useEffect, useState } from "react";

const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const API_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/v1`;
  const { user } = useSelector(userSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const Links: Array<{ name: string; href: string }> = [
    { name: "Home", href: "/" },
    user ? { name: "Logout", href: "/logout" } : { name: "Login", href: "/login" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${API_URL}/users/profile/${user?.id}`);
      const userData = await response.json();
      console.log("nav bar user data", userData.profile.avatarUrl);
      setAvatarUrl(userData.profile.avatarUrl);
    };
    fetchProfile();
  }, []);

  const openProfile = (): MouseEventHandler<HTMLSpanElement> | undefined => {
    navigate(`/profile`);
    return;
    throw new Error("Function not implemented.");
  };

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
            <Image src="/logo.png" w="175px" />
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
          <Avatar onClick={openProfile} name={user?.displayName} src={avatarUrl} />
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
