import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";
import PrivateComponent from "../PrivateComponent";

const Layout = ({ children }) => {
  return (
    <Box overflowX="hidden">
      <PrivateComponent>
        <Header position="sticky" h="10vh" />
      </PrivateComponent>
      <Flex minH="80vh" w="100vw" justify="center">
        <Flex
          minH="80vh"
          w="90vw"
          // align="center"
          justify="center"
          backgroundColor="#F7AFC"
        >
          {children}
        </Flex>
      </Flex>
      <PrivateComponent>
        <Footer h="10vh" />
      </PrivateComponent>
    </Box>
  );
};
export default Layout;
