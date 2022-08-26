import React, { useEffect, useState } from "react";
import { Heading, Box, Grid, GridItem, Flex, Divider } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import CustomSpinner from "../../commons/CustomSpinner";
import _ from "lodash";

import {
  CITIZEN_DOSE_CHART,
  VACCINE_CHART,
  BAR_CHART,
} from "../../../constant";
import useToastCustom from "../../../hooks/useToast";
import {
  fetchCitizens,
  fetchCitizensIncludeVaccineId,
  fetchVaccines,
} from "../../../services/firebase";
import {
  extractDosesOfTypeOnStatusDataSet,
  extractStatusFromCitizens,
  extractVaccineFromCitizens,
} from "../../../utils";
import {
  BOX_BORDER_COLOR,
  chartOptions,
  TITLE_INFO_COLOR,
} from "../../../configs";
import EmptyCustom from "../../commons/EmptyCustom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashBoard = () => {
  const toast = useToastCustom();
  const [isLoading, setIsLoading] = useState(true);
  const [dosesChartData, setDosesChartData] = useState([]);
  const [vaccinesChartData, setVaccinesChartData] = useState([]);
  const [dosesOfTypeOnStatusChartData, setdosesOfTypeOnStatusChartData] =
    useState([]);
  const [citizens, setCitizens] = useState([]);
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const init = async () => {
      let rsCitizens = [];
      let rsVaccines = [];
      let rsCitizensWithVaccine = [];
      try {
        rsCitizens = await fetchCitizens();
        setCitizens(rsCitizens);
        setDosesChartData(extractStatusFromCitizens(rsCitizens));
      } catch (e) {
        toast({
          title: "Cannot get citizens",
          description: "There was some errors fetching citizens",
          status: "error",
        });
      }
      try {
        rsVaccines = await fetchVaccines();
        setVaccines(rsVaccines);
        rsCitizensWithVaccine = await fetchCitizensIncludeVaccineId();
        setVaccinesChartData(
          extractVaccineFromCitizens(rsCitizensWithVaccine, rsVaccines)
        );
        setdosesOfTypeOnStatusChartData(
          extractDosesOfTypeOnStatusDataSet(rsCitizensWithVaccine, rsVaccines)
        );
      } catch (e) {
        toast({
          title: "Cannot get vaccines",
          description: "There was some errors fetching vaccines",
          status: "error",
        });
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const renderContent = () => {
    if (_.isEmpty(citizens) && _.isEmpty(vaccines)) {
      return (
        <EmptyCustom
          heading={"Oops, please add citizens and vaccines to see dashboard"}
        />
      );
    }
    return (
      <Grid
        w="80%"
        h="100%"
        p={10}
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={20}
      >
        <GridItem>
          <Pie
            data={dosesChartData}
            options={chartOptions[CITIZEN_DOSE_CHART]}
          />
        </GridItem>
        <GridItem>
          <Doughnut
            data={vaccinesChartData}
            options={chartOptions[VACCINE_CHART]}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Bar
            data={dosesOfTypeOnStatusChartData}
            options={chartOptions[BAR_CHART]}
          />
        </GridItem>
      </Grid>
    );
  };

  // TODO: Refactor into loading context
  if (isLoading) {
    return (
      <Flex h="100%" w="100%" align="center" justify="center">
        <CustomSpinner />
      </Flex>
    );
  }

  return (
    <Flex py={5} direction="column" align="center" w="100%">
      <Heading color={TITLE_INFO_COLOR}>Dash Board</Heading>
      <Divider my={5} color={BOX_BORDER_COLOR} />
      {renderContent()}
    </Flex>
  );
};

export default DashBoard;
