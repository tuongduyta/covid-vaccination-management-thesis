import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

import { ADD_VACCINATION, MANAGE_VACCINATION } from "../../../../constant";
import { vaccinationFormConfigs, paths } from "../../../../configs";
import { getFormFields, getInitialFormValues } from "../../../../utils";
import GenericForm from "../../../commons/GenericForm";
import InformationCard from "../../../commons/InformationCard";
import { addVaccine } from "../../../../services/firebase";
import useToastCustom from "../../../../hooks/useToast";

const AddVaccination = () => {
  let navigate = useNavigate();
  const toast = useToastCustom();
  const [fields, setFields] = useState(getFormFields(vaccinationFormConfigs));
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(faker.image.avatar());

  const handleChange = (keyChange, value) => {
    setFields((pre) => {
      return { ...pre, [keyChange]: { ...pre[keyChange], value: value } };
    });
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await addVaccine({ ...values, img: img });
      toast({
        title: "Added vaccine",
        description: "Vaccine is successfully added",
      });
      navigate(paths[MANAGE_VACCINATION].path);
    } catch (e) {
      toast({
        title: "Added fail",
        description: "There is some error with the server",
        status: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <Flex h="100%" w="100%">
      <GenericForm
        initialFormValues={getInitialFormValues(vaccinationFormConfigs)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        heading={paths[ADD_VACCINATION].label}
        formConfigs={vaccinationFormConfigs}
      />
      <InformationCard formValues={fields} avt={img} setAvt={setImg} />
    </Flex>
  );
};

export default AddVaccination;
