import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

import InformationCard from "../../../commons/InformationCard";
import GenericForm from "../../../commons/GenericForm";
import CustomSpinner from "../../../commons/CustomSpinner";
import useToastCustom from "../../../../hooks/useToast";
import { fetchVaccineById } from "../../../../services/firebase";
import { EDIT_CITIZEN, MANAGE_VACCINATION } from "../../../../constant";
import { vaccinationFormConfigs, paths } from "../../../../configs";
import { editVaccine } from "../../../../services/firebase";
import { getFormFields } from "../../../../utils";

const EditCitizen = () => {
  let navigate = useNavigate();
  const { vaccineId } = useParams();
  const toast = useToastCustom();
  const [vaccine, setVaccine] = useState({});
  const [img, setImg] = useState(null);
  const [fields, setFields] = useState(getFormFields(vaccinationFormConfigs));
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const initialization = async () => {
      try {
        const vaccineResult = await fetchVaccineById(vaccineId);
        if (!vaccineResult) {
          toast({
            title: "Vaccine is not exist",
            description: "Given vaccine is not exist",
            status: "error",
          });
          return;
        }
        const { img: rsImg, ...rsVaccine } = vaccineResult;
        setVaccine(rsVaccine);
        setImg(rsImg);
      } catch (e) {
        toast({
          title: "Cannot get citizen",
          description: "There was some errors with given citizen",
          status: "error",
        });
      }
      setIsLoading(false);
    };
    initialization();
  }, []);

  useEffect(() => {
    if (!vaccine) return;
    const fieldsTempt = fields;
    _.forOwn(vaccine, (val, key) => {
      fieldsTempt[key] = { ...fieldsTempt[key], value: val };
    });
    setFields({ ...fieldsTempt });
  }, [vaccine]);

  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async () => {
    setIsFormLoading(true);
    const editedValues = _.mapValues(fields, "value");
    try {
      await editVaccine(vaccineId, editedValues);
      navigate(paths[MANAGE_VACCINATION].path);
      toast({
        title: "Vaccine edited",
        description: "Vaccine has been edited successfully",
      });
    } catch (e) {
      toast({
        title: "Edited failed",
        description: "Vaccine has been failed to edit",
      });
    }
    setIsFormLoading(false);
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
        initialFormValues={vaccine}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isFormLoading}
        heading={paths[EDIT_CITIZEN].label}
        formConfigs={vaccinationFormConfigs}
      />
      <InformationCard formValues={fields} avt={img} setAvt={setImg} />
    </Flex>
  );
};

export default EditCitizen;
