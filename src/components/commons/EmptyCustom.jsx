import React from "react";
import { Flex, Icon, Heading } from "@chakra-ui/react";
import { AiOutlineInbox } from "react-icons/ai";

import { DETAIL_INFO_COLOR, PRIMARY_PATTERN_COLOR } from "../../configs";

const EmptyCustom = ({ heading }) => {
  return (
    <Flex direction="column" h="100%" w="100%" align="center" justify="center">
      <Icon boxSize={20} color={PRIMARY_PATTERN_COLOR} as={AiOutlineInbox} />
      <Heading mt={5} size="md" color={DETAIL_INFO_COLOR}>
        {heading}
      </Heading>
    </Flex>
  );
};

export default EmptyCustom;
