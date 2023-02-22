import { Link, useColorModeValue, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";

import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import type { LinkProps as RouterLinkProps } from "react-router-dom";

interface NavLinkProps {
  name: string;
  href: string;
  isActive?: boolean;
}

const NavLink = ({ name, href, isActive = false }: NavLinkProps) => {
  const isExternal =
    typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  let LinkProps: RouterLinkProps | ChakraLinkProps = {};

  if (isExternal) {
    LinkProps = { href: href, isExternal };
  } else {
    LinkProps = {
      fontWeight: isActive ? 600 : "normal",
      as: RouterLink,
      to: href,
    };
  }
  return (
    <Link
      px={3}
      py={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: "unset",
        bg: useColorModeValue("gray.100", "gray.700"),
      }}
      {...LinkProps}
    >
      {name}
      {isExternal && <Icon as={BiLinkExternal} ml={2} />}
    </Link>
  );
};

export default NavLink;
