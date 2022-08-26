import React from "react";
import { Flex, Box, Icon, Heading, Button, HStack } from "@chakra-ui/react";
import { FaShieldVirus } from "react-icons/fa";
import { BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";

import {
  PRIMARY_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_PATTERN_COLOR,
} from "../../../configs";

const SocialMediaBtn = ({ icon }) => {
  return (
    <Button colorScheme={PRIMARY_COLOR} boxSize={10} rounded={"full"}>
      <Icon as={icon} />
    </Button>
  );
};

const Footer = ({ ...props }) => {
  return (
    <Flex
      w="100vw"
      p={5}
      justify="space-between"
      align="center"
      borderWidth={1}
      bgColor={PRIMARY_BACKGROUND_COLOR}
      {...props}
    >
      <Flex align="center">
        <Icon
          boxSize={10}
          color={PRIMARY_PATTERN_COLOR}
          as={FaShieldVirus}
          mr={2}
        />
        <Heading size="md">CovidCMS</Heading>
      </Flex>
      <Box w="50vw" textAlign="center">
        © 2022 Pambao. All rights reverved
      </Box>
      <HStack>
        <SocialMediaBtn icon={BsYoutube} />
        <SocialMediaBtn icon={BsTwitter} />
        <SocialMediaBtn icon={BsInstagram} />
      </HStack>
    </Flex>
  );
};

export default Footer;
