import React from "react";
import { Spinner } from "@chakra-ui/react";
import { BOX_BORDER_COLOR, PRIMARY_PATTERN_COLOR } from "../../configs";

const CustomSpinner = () => {
  return (
    <Spinner
      thickness="3px"
      speed="0.65s"
      emptyColor={BOX_BORDER_COLOR}
      color={PRIMARY_PATTERN_COLOR}
      size="xl"
    />
  );
};

export default CustomSpinner;
