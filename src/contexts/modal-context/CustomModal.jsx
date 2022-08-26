import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
} from "@chakra-ui/react";
import { PRIMARY_COLOR } from "../../configs";

const CustomModal = ({
  header,
  body,
  isOpen,
  onClose,
  action,
  isActionLoading,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">{header}</Heading>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme={PRIMARY_COLOR}
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            ml={3}
            colorScheme={PRIMARY_COLOR}
            isLoading={isActionLoading}
            onClick={action}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
