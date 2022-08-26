import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Icon,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-chakra-pagination";
import { HiOutlineDocumentAdd } from "react-icons/hi";

import { useModal } from "../../../contexts/modal-context";
import useToastCustom from "../../../hooks/useToast";
import {
  deleteCitizen,
  deleteVaccination,
  fetchVaccineByNameOrCode,
  fetchVaccines,
} from "../../../services/firebase";
import {
  BOX_BORDER_COLOR,
  paths,
  PRIMARY_COLOR,
  TITLE_INFO_COLOR,
} from "../../../configs";
import { getVaccineTableData } from "../../../utils";
import CustomSpinner from "../../commons/CustomSpinner";
import { vaccinationTableColumns } from "../../../configs/vaccinationTable";
import { AiOutlineInbox } from "react-icons/ai";
import { ADD_VACCINATION } from "../../../constant";
import { BsSearch } from "react-icons/bs";

const ManageVaccination = () => {
  const navigate = useNavigate();
  const { openModal, onClose, setIsActionLoading } = useModal();
  const toast = useToastCustom();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);

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
    const vaccinations = await fetchVaccines();
    setTableData(
      getVaccineTableData(vaccinations, handleDelete, handleNavigate)
    );
    setIsLoading(false);
  };

  const handleNavigate = (pathName, vaccineId) => {
    navigate(`${paths[pathName].pathWithNoParams}/${vaccineId}`);
  };

  const fetchWithSearchTerm = async () => {
    setIsLoading(true);
    const vaccinations = await fetchVaccineByNameOrCode(searchTerm);
    setTableData(
      getVaccineTableData(vaccinations, handleDelete, handleNavigate)
    );
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

  const handleDelete = (vaccineId, vaccineCode) => {
    openModal({
      header: "Delete vaccination",
      body: `Are you sure to delete citizen with code ${vaccineCode}?`,
      actionFunc: async () => {
        setIsActionLoading(true);
        try {
          await deleteVaccination(vaccineId);
          toast({
            title: "Deleted successfully",
            description: "Vaccination has been deleted",
          });
          reloadTable();
        } catch (e) {
          toast({
            title: "Deleted failed",
            description: "Failed to delete vaccine",
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
        columns={vaccinationTableColumns}
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
          <Heading color={TITLE_INFO_COLOR}>Vaccination Table</Heading>
          <Flex w="40%" justify="end">
            <Link to={paths[ADD_VACCINATION].path}>
              <Button colorScheme={PRIMARY_COLOR}>
                <Icon mr={1} as={HiOutlineDocumentAdd} boxSize={5} />
                Add Vaccination
              </Button>
            </Link>
            <InputGroup ml={3} w="50%">
              <Input
                placeholder="Search by name or code"
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

export default ManageVaccination;
