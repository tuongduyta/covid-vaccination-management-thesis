import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import useToastCustom from "../../../../hooks/useToast";
import InformationCard from "../../../commons/InformationCard";
import { fetchCitizenById } from "../../../../services/firebase";
import { citizenFormConfigs } from "../../../../configs";
import CustomSpinner from "../../../commons/CustomSpinner";
import { getFormFields } from "../../../../utils";

const DetailCitizen = () => {
  const toast = useToastCustom();
  const { citizenId } = useParams();
  const [citizen, setCitizen] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [avt, setAvt] = useState(null);
  const [fields, setFields] = useState(getFormFields(citizenFormConfigs));
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const initialization = async () => {
      try {
        const citizenResult = await fetchCitizenById(citizenId);
        if (!citizenResult) {
          toast({
            title: "Citizen is not exist",
            description: "Given citizen is not exist",
          });
          return;
        }
        const { avt: rsAvt, doses, ...rsCitizen } = citizenResult;
        setCitizen(rsCitizen);
        setAvt(rsAvt);
        setVaccines(doses);
      } catch (e) {
        toast({
          title: "Cannot get citizen",
          description: "There was some errors with given citizen",
          status: "Error",
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

  if (isLoading) {
    return (
      <Flex h="100%" w="100%" align="center" justify="center">
        <CustomSpinner />
      </Flex>
    );
  }
  return (
    <InformationCard
      vaccines={vaccines}
      formValues={fields}
      avt={avt}
      setAvt={setAvt}
      isSingleView={true}
    />
  );
};

export default DetailCitizen;
