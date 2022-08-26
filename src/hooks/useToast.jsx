import React from "react";
import { useToast } from "@chakra-ui/react";

const useToastCustom = () => {
  const toast = useToast();
  return ({ title, description, ...rest }) => {
    return toast({
      title,
      description,
      status: "success",
      position: "bottom",
      duration: 5000,
      isClosable: true,
      ...rest,
    });
  };
};

export default useToastCustom;
