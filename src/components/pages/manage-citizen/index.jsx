import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Flex,
  InputGroup,
  InputRightElement,
  Icon,
  Input,
} from "@chakra-ui/react";
import { Table } from "react-chakra-pagination";
import { AiOutlineInbox } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

import CustomSpinner from "../../commons/CustomSpinner";
import {
  fetchCitizens,
  fetchCitizensByIdOrName,
} from "../../../services/firebase";
import {
  PRIMARY_COLOR,
  citizenTableColumns,
  TITLE_INFO_COLOR,
  BOX_BORDER_COLOR,
  paths,
} from "../../../configs";
import { getCitizenTableData } from "../../../utils";
import { useModal } from "../../../contexts/modal-context";
import useToastCustom from "../../../hooks/useToast";
import { deleteCitizen } from "../../../services/firebase";
import { ADD_CITIZEN } from "../../../constant";

const ManageCitizen = () => {
  const navigate = useNavigate();
  const { openModal, onClose, setIsActionLoading } = useModal();
  const toast = useToastCustom();

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchTerm === "") {
      fetchAll();
      return;
    }
    const timerId = setTimeout(fetchWithSearchTerm, 1000);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const fetchAll = async () => {
    setIsLoading(true);
    const citizens = await fetchCitizens();
    setTableData(getCitizenTableData(citizens, handleDelete, handleNavigate));
    setIsLoading(false);
  };

  const fetchWithSearchTerm = async () => {
    setIsLoading(true);
    const citizens = await fetchCitizensByIdOrName(searchTerm);
    setTableData(getCitizenTableData(citizens, handleDelete, handleNavigate));
    setIsLoading(false);
  };

  const reloadTable = () => {
    if (searchTerm === "") {
      fetchAll();
      return;
    }
    fetchWithSearchTerm();
  };

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigate = (pathName, citizenId) => {
    navigate(`${paths[pathName].pathWithNoParams}/${citizenId}`);
  };

  const handleDelete = (citizenId, citizenIdNumber) => {
    openModal({
      header: "Delete citizen",
      body: `Are you sure to delete citizen with id number ${citizenIdNumber}?`,
      actionFunc: async () => {
        setIsActionLoading(true);
        try {
          await deleteCitizen(citizenId);
          toast({
            title: "Deleted successfully",
            description: "Citizen has been deleted",
          });
          reloadTable();
        } catch (e) {
          toast({
            title: "Deleted failed",
            description: "Failed to delete citizen",
          });
        } finally {
          setIsActionLoading(false);
          onClose();
        }
      },
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Flex h="30vh" w="100%" justify="center" align="center">
          <CustomSpinner />
        </Flex>
      );
    }
    return (
      <Table
        colorScheme={PRIMARY_COLOR}
        height="300px"
        columns={citizenTableColumns}
        data={tableData}
        totalRegisters={tableData.length}
        page={page}
        emptyData={{
          icon: AiOutlineInbox,
          text: "No result found",
        }}
        onPageChange={(page) => setPage(page)}
      />
    );
  };

  return (
    <Box w="100%">
      <Box>
        <Flex py={5} px={10} justify="space-between" align="center">
          <Heading color={TITLE_INFO_COLOR}>Citizen Table</Heading>
          <Flex w="40%" justify="end">
            <Link to={paths[ADD_CITIZEN].path}>
              <Button colorScheme={PRIMARY_COLOR}>
                <Icon mr={1} as={HiOutlineDocumentAdd} boxSize={5} />
                Add Citizen
              </Button>
            </Link>
            <InputGroup ml={3} w="50%">
              <Input
                placeholder="Search by name or id"
                value={searchTerm}
                onChange={handleTermChange}
              />
              <InputRightElement
                pointerEvents="none"
                children={<Icon color={PRIMARY_COLOR} as={BsSearch} />}
              />
            </InputGroup>
          </Flex>
        </Flex>
        <Divider mb={5} color={BOX_BORDER_COLOR} />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ManageCitizen;
