import React, { useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import CustomModal from "./CustomModal";

const ModalContext = React.createContext();

const useModal = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [headerContent, setHeaderContent] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [action, setAction] = useState(() => {});
  const [isActionLoading, setIsActionLoading] = useState(false);

  const openModal = ({ header, body, actionFunc }) => {
    setHeaderContent(header);
    setBodyContent(body);
    setAction(() => {
      return actionFunc;
    });
    onOpen();
  };

  const values = { isOpen, openModal, onClose, setIsActionLoading };

  return (
    <ModalContext.Provider value={values}>
      <CustomModal
        header={headerContent}
        body={bodyContent}
        isOpen={isOpen}
        onClose={onClose}
        action={action}
        isActionLoading={isActionLoading}
      />
      {children}
    </ModalContext.Provider>
  );
};

export { useModal };
export default ModalProvider;
