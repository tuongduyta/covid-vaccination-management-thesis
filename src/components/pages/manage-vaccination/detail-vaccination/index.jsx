import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import useToastCustom from "../../../../hooks/useToast";
import InformationCard from "../../../commons/InformationCard";
import { fetchVaccineById } from "../../../../services/firebase";
import { getFormFields } from "../../../../utils";
import { vaccinationFormConfigs } from "../../../../configs";
import CustomSpinner from "../../../commons/CustomSpinner";

const DetailVaccination = () => {
  const toast = useToastCustom();
  const { vaccineId } = useParams();
  const [vaccine, setVaccine] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [fields, setFields] = useState(getFormFields(vaccinationFormConfigs));

  useEffect(() => {
    setIsLoading(true);
    const init = async () => {
      try {
        const vaccinationResult = await fetchVaccineById(vaccineId);
        if (!vaccineId) {
          toast({
            title: "Vaccine is not exist",
            description: "Given vaccine is not exist",
          });
          return;
        }
        const { img: rsImg, ...rsVaccine } = vaccinationResult;
        setVaccine(rsVaccine);
        setImg(rsImg);
      } catch (e) {
        toast({
          title: "Cannot get vaccine",
          description: "There was some errors with given vaccine",
        });
      }
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!vaccine) return;
    const fieldTempt = fields;
    _.forOwn(vaccine, (val, key) => {
      fieldTempt[key] = { ...fieldTempt[key], value: val };
    });
    setFields({ ...fieldTempt });
  }, [vaccine]);

  if (isLoading) {
    return (
      <Flex h="100%" w="100%" align="center" justify="center">
        <CustomSpinner />
      </Flex>
    );
  }

  return (
    <InformationCard
      formValues={fields}
      avt={img}
      setAvt={setImg}
      isSingleView={true}
    />
  );
};

export default DetailVaccination;
