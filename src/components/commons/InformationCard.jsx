import React, { useEffect } from "react";
import _ from "lodash";
import {
  Flex,
  Heading,
  Avatar,
  Box,
  Stack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

import {
  PRIMARY_PATTERN_COLOR,
  TITLE_INFO_COLOR,
  DETAIL_INFO_COLOR,
  BOX_BORDER_COLOR,
} from "../../configs";
import { renderGender, renderVaccineTags, toLocaleDate } from "../../utils";

const field = ({ label, icon, value }) => {
  return (
    <React.Fragment key={label}>
      <Flex align="center">
        <Icon as={icon} boxSize={6} mr={3} color={PRIMARY_PATTERN_COLOR} />
        <Flex key={label} w="100%">
          <Box color={TITLE_INFO_COLOR} fontWeight="semibold" w="30%">
            {label}:
          </Box>
          <Box fontWeight="medium" w="60%" color={DETAIL_INFO_COLOR}>
            {value}
          </Box>
        </Flex>
      </Flex>
      <Divider />
    </React.Fragment>
  );
};

const InformationCard = ({
  formValues,
  avt,
  setAvt,
  isSingleView = false,
  vaccines,
}) => {
  useEffect(() => {
    if (avt) {
      return;
    }
    setAvt(faker.internet.avatar());
  }, [avt]);

  const renderFields = () => {
    let result = [];
    _.forOwn(formValues, (fieldInfo, key) => {
      switch (key) {
        case "dob":
          const dobVal = fieldInfo.value;
          fieldInfo = { ...fieldInfo, value: toLocaleDate(dobVal) };
          result.push(field(fieldInfo));
          break;
        case "gender":
          const genderVal = fieldInfo.value;
          fieldInfo = { ...fieldInfo, value: renderGender(genderVal) };
          result.push(field(fieldInfo));
          break;
        case "doses":
          fieldInfo = { ...fieldInfo, value: renderVaccineTags(vaccines) };
          result.push(field(fieldInfo));
          break;
        default:
          result.push(field(fieldInfo));
      }
    });
    return result;
  };

  return (
    <Flex
      direction="column"
      p={5}
      align="center"
      h="100%"
      w={isSingleView ? "70%" : "60%"}
      borderLeftWidth={isSingleView ? 0 : 3}
      borderColor={BOX_BORDER_COLOR}
    >
      <Heading color={TITLE_INFO_COLOR} mb={5}>
        Profile Preview
      </Heading>

      <Avatar mb={5} size="xl" src={avt} />

      <Stack w="100%" spacing={5}>
        {renderFields()}
      </Stack>
    </Flex>
  );
};

export default InformationCard;
