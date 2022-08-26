import React from "react";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Text,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaShieldVirus } from "react-icons/fa";
import _ from "lodash";
import { faker } from "@faker-js/faker";

import { paths } from "../../../configs";
import { useAuth } from "../../../contexts/AuthContext";
import {
  PRIMARY_COLOR,
  NAVBAR_PATTERN_COLOR,
  PRIMARY_PATTERN_COLOR,
  BOX_BORDER_COLOR,
} from "../../../configs";
import { isPathMatch } from "../../../utils";

const Header = ({ ...props }) => {
  let { pathname } = useLocation();
  const { logout } = useAuth();

  const renderNavItems = () => {
    return _.values(paths)
      .filter((item) => !item.isHidden)
      .map((item) => (
        <Link key={item.label} to={item.path}>
          <Flex
            align="center"
            p={3}
            borderRadius="md"
            _hover={{ bg: PRIMARY_PATTERN_COLOR, cursor: "pointer" }}
            transition=".15s ease"
            bgColor={
              isPathMatch(pathname, item.path) ? NAVBAR_PATTERN_COLOR : "white"
            }
          >
            <Icon as={item.icon} boxSize={6} mr={1} />
            <Text fontWeight="semibold">{item.label}</Text>
          </Flex>
        </Link>
      ));
  };

  return (
    <Flex
      w="100vw"
      align="center"
      justify="space-between"
      p={5}
      borderWidth={1}
      borderColor={BOX_BORDER_COLOR}
      shadow="md"
      {...props}
    >
      <Flex w="100%">
        <Flex align="center" mr="10">
          <Icon
            boxSize={10}
            color={PRIMARY_PATTERN_COLOR}
            as={FaShieldVirus}
            mr={3}
          />
          <Text
            bgGradient={`linear(to-r, ${PRIMARY_COLOR}.500 , ${PRIMARY_COLOR}.300)`}
            bgClip="text"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            letterSpacing="tight"
          >
            Covid Management System
          </Text>
        </Flex>
        <HStack spacing={10}>{renderNavItems()}</HStack>
      </Flex>
      <Stack direction="row" align="center" spacing={5}>
        <Button
          align="center"
          colorScheme={PRIMARY_COLOR}
          onClick={() => logout()}
        >
          Logout
        </Button>
        <Avatar size="sm" src={faker.internet.avatar()} />
      </Stack>
    </Flex>
  );
};

export default Header;
