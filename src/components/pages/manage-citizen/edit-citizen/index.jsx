import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import _ from "lodash";

import InformationCard from "../../../commons/InformationCard";
import GenericForm from "../../../commons/GenericForm";
import CustomSpinner from "../../../commons/CustomSpinner";
import useToastCustom from "../../../../hooks/useToast";
import {
  createVaccineRef,
  fetchCitizenById,
  fetchVaccines,
} from "../../../../services/firebase";
import { EDIT_CITIZEN, MANAGE_CITIZEN } from "../../../../constant";
import {
  citizenFormConfigs,
  NAVBAR_PATTERN_COLOR,
  paths,
} from "../../../../configs";
import { editCitizen } from "../../../../services/firebase";
import {
  getFormFields,
  vaccineToVaccineSelector,
  customSelectionRender,
} from "../../../../utils";

const EditCitizen = () => {
  let navigate = useNavigate();
  const { citizenId } = useParams();
  const toast = useToastCustom();
  const [citizen, setCitizen] = useState({});
  const [avt, setAvt] = useState(null);
  const [fields, setFields] = useState(getFormFields(citizenFormConfigs));
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pickerItems, setPickerItems] = useState([]);

  useEffect(() => {
    const initialization = async () => {
      try {
        const citizenResult = await fetchCitizenById(citizenId);
        if (!citizenResult) {
          toast({
            title: "Citizen is not exist",
            description: "Given citizen is not exist",
            status: "error",
          });
          return;
        }
        const { avt: rsAvt, doses, ...rsCitizen } = citizenResult;
        setCitizen(rsCitizen);
        setAvt(rsAvt);
        setSelectedItems(doses);
      } catch (e) {
        toast({
          title: "Cannot get citizen",
          description: "There was some errors with given citizen",
          status: "error",
        });
      }
      try {
        const rsVaccine = await fetchVaccines();
        const mappedVaccines = vaccineToVaccineSelector(rsVaccine);
        setPickerItems(mappedVaccines);
      } catch (e) {
        toast({
          title: "Cannot get vaccines",
          description: "There was some errors in the server",
          status: "error",
        });
      }
      setIsLoading(false);
    };
    initialization();
  }, []);

  useEffect(() => {
    if (!citizen) return;
    const fieldsTempt = fields;
    _.forOwn(citizen, (val, key) => {
      fieldsTempt[key] = { ...fieldsTempt[key], value: val };
    });
    setFields({ ...fieldsTempt });
  }, [citizen]);

  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async () => {
    setIsFormLoading(true);
    const editedValues = _.mapValues(fields, "value");
    try {
      const vaccinesRefs = selectedItems.map((vaccine) =>
        createVaccineRef(vaccine.id)
      );
      await editCitizen(citizenId, { ...editedValues, doses: vaccinesRefs });
      navigate(paths[MANAGE_CITIZEN].path);
      toast({
        title: "Citizen edited",
        description: "Citizen has been edited successfully",
      });
    } catch (e) {
      toast({
        title: "Edited failed",
        description: "Citizen has been failed to edit",
      });
    }
    setIsFormLoading(false);
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
        initialFormValues={citizen}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isFormLoading}
        heading={paths[EDIT_CITIZEN].label}
        formConfigs={citizenFormConfigs}
      >
        <CUIAutoComplete
          tagStyleProps={{ bg: NAVBAR_PATTERN_COLOR }}
          highlightItemBg={NAVBAR_PATTERN_COLOR}
          disableCreateItem
          hideToggleButton
          label="Doses"
          placeholder="Type to search for a vaccine"
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

export default EditCitizen;
