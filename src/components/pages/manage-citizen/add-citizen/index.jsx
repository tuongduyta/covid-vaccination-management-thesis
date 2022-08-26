import React, { useEffect, useState } from "react";
import { Avatar, Flex, Box } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import _ from "lodash";

import { ADD_CITIZEN } from "../../../../constant";
import {
  addCitizen,
  createVaccineRef,
  fetchVaccines,
} from "../../../../services/firebase";
import {
  citizenFormConfigs,
  NAVBAR_PATTERN_COLOR,
  paths,
} from "../../../../configs";
import {
  getInitialFormValues,
  getFormFields,
  vaccineToVaccineSelector,
  customSelectionRender,
} from "../../../../utils";
import GenericForm from "../../../commons/GenericForm";
import InformationCard from "../../../commons/InformationCard";
import useToastCustom from "../../../../hooks/useToast";
import { MANAGE_CITIZEN } from "../../../../constant";
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../../../commons/CustomSpinner";

const AddCitizen = () => {
  const navigate = useNavigate();
  const toast = useToastCustom();
  const [fields, setFields] = useState(getFormFields(citizenFormConfigs));
  const [avt, setAvt] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [pickerItems, setPickerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const rsVaccines = await fetchVaccines();
      const mappedVaccines = vaccineToVaccineSelector(rsVaccines);
      setPickerItems(mappedVaccines);
    };
    setIsLoading(false);
    init();
  }, []);

  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async (values) => {
    setIsSubmitLoading(true);
    try {
      const vaccinesRefs = selectedItems.map((vaccine) =>
        createVaccineRef(vaccine.id)
      );
      await addCitizen({ ...values, avt: avt, doses: vaccinesRefs });
      toast({
        title: "Added citizen",
        description: "Citizen is successfully added",
      });
      navigate(paths[MANAGE_CITIZEN].path);
    } catch (e) {
      toast({
        title: "Added fail",
        description: "There is some error with the server",
        status: "error",
      });
    }
    setIsSubmitLoading(false);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      const newSelectedItem = _.cloneDeep(selectedItems);
      _.each(newSelectedItem, (item, index) => {
        item.label = `${index + 1}: ${item.vaccineName}`;
        item.value = `${index + 1}: ${item.vaccineName}`;
      });
      setSelectedItems(newSelectedItem);
    }
  };

  if (isLoading) {
    return (
      <Flex h="100%" w="100%" align="center" justify="center">
        <CustomSpinner />
      </Flex>
    );
  }

  return (
    <Flex h="100%" w="100%">
      <GenericForm
        initialFormValues={getInitialFormValues(citizenFormConfigs)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitLoading={isSubmitLoading}
        heading={paths[ADD_CITIZEN].label}
        formConfigs={citizenFormConfigs}
      >
        <CUIAutoComplete
          tagStyleProps={{ bg: NAVBAR_PATTERN_COLOR }}
          highlightItemBg={NAVBAR_PATTERN_COLOR}
          disableCreateItem
          hideToggleButton
          label="Doses"
          placeholder="Type to Search for a vaccine"
          items={pickerItems}
          selectedItems={selectedItems}
          itemRenderer={customSelectionRender}
          onSelectedItemsChange={(changes) => {
            handleSelectedItemsChange(changes.selectedItems);
          }}
        />
      </GenericForm>
      <InformationCard
        vaccines={selectedItems}
        formValues={fields}
        avt={avt}
        setAvt={setAvt}
      />
    </Flex>
  );
};

export default AddCitizen;
