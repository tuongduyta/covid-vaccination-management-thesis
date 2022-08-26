import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { BsGenderFemale, BsGenderMale, BsPen, BsTrash } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  DASH_BOARD,
  DETAIL_CITIZEN,
  DETAIL_VACCINATION,
  EDIT_CITIZEN,
  EDIT_VACCINATION,
  FULLY_PROTECTED,
  GENDER_FEMALE,
  GENDER_MALE,
  HIGHLY_PROTECTED,
  PARTIAL_PROTECTED,
  SUPER_PROTECTED,
  UNPROTECTED,
} from "../constant";
import {
  paths,
  PRIMARY_COLOR,
  NAVBAR_PATTERN_COLOR,
  PRIMARY_PATTERN_COLOR,
} from "../configs";
import _ from "lodash";
import { vaccineStatus } from "../configs";

const convertStatus = (doses) => {
  let configs = {};
  switch (doses) {
    case 0:
      configs = vaccineStatus[UNPROTECTED];
      break;
    case 1:
      configs = vaccineStatus[PARTIAL_PROTECTED];
      break;
    case 2:
      configs = vaccineStatus[HIGHLY_PROTECTED];
      break;
    case 3:
      configs = vaccineStatus[FULLY_PROTECTED];
      break;
    default:
      configs = vaccineStatus[SUPER_PROTECTED];
  }
  return <Badge colorScheme={configs.color}>{configs.label}</Badge>;
};
// TODO: Separate this file into smaller files
export const getCitizenTableData = (citizens, handleDelete, handleNavigate) => {
  return citizens.map((citizen) => ({
    avt: <Avatar src={citizen.avt} />,
    idNumber: citizen.idNumber,
    firstName: citizen.firstName,
    lastName: citizen.lastName,
    gender: renderGender(citizen.gender),
    dob: toLocaleDate(citizen.dob),
    doses: convertStatus(citizen.doses),
    address: citizen.address,
    actions: (
      <HStack spacing={3}>
        <Button
          colorScheme="green"
          onClick={() => {
            handleNavigate(DETAIL_CITIZEN, citizen.id);
          }}
        >
          <Icon boxSize={3} as={MdOpenInNew} />
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            handleNavigate(EDIT_CITIZEN, citizen.id);
          }}
        >
          <Icon boxSize={3} as={BsPen} />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDelete(citizen.id, citizen.idNumber);
          }}
        >
          <Icon boxSize={3} as={BsTrash} />
        </Button>
      </HStack>
    ),
  }));
};

export const getVaccineTableData = (vaccines, handleDelete, handleNavigate) => {
  return vaccines.map((vaccine) => ({
    img: <Avatar src={vaccine.img} />,
    id: vaccine.id,
    vaccineName: vaccine.vaccineName,
    code: vaccine.code,
    origin: vaccine.origin,
    actions: (
      <HStack spacing={3}>
        <Button
          colorScheme="green"
          onClick={() => {
            handleNavigate(DETAIL_VACCINATION, vaccine.id);
          }}
        >
          <Icon boxSize={3} as={MdOpenInNew} />
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            handleNavigate(EDIT_VACCINATION, vaccine.id);
          }}
        >
          <Icon boxSize={3} as={BsPen} />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDelete(vaccine.id, vaccine.code);
          }}
        >
          <Icon boxSize={3} as={BsTrash} />
        </Button>
      </HStack>
    ),
  }));
};

export const getInitialFormValues = (formConfigs) => {
  return _.chain(formConfigs)
    .filter((config) => !config.isHidden)
    .keyBy((field) => field.name)
    .mapValues(({ defaultValue = "" }) => defaultValue)
    .value();
};

export const getFormFields = (formConfigs) => {
  return _.chain(formConfigs)
    .keyBy((field) => field.name)
    .mapValues(({ label, icon, defaultValue }) => {
      return {
        label,
        icon,
        value: defaultValue || defaultValue === 0 ? defaultValue : "",
      };
    })
    .value();
};

export const renderVaccineTags = (vaccines) => {
  return (
    <HStack spacing={2}>
      {vaccines.map((vaccine) => {
        return (
          <Link
            key={vaccine.id}
            to={`${paths[DETAIL_VACCINATION].pathWithNoParams}/${vaccine.id}`}
          >
            <Tag
              bgColor={NAVBAR_PATTERN_COLOR}
              _hover={{ bg: PRIMARY_PATTERN_COLOR, cursor: "pointer" }}
            >
              <Flex align="center">
                <Avatar src={vaccine.img} size="2xs" />
                <Box ml={2}>{vaccine.label}</Box>
              </Flex>
            </Tag>
          </Link>
        );
      })}
    </HStack>
  );
};

export const renderGender = (value) => {
  if (parseInt(value) === GENDER_MALE) {
    return (
      <Badge colorScheme={PRIMARY_COLOR}>
        Male <Icon as={BsGenderMale} />
      </Badge>
    );
  }
  if (parseInt(value) === GENDER_FEMALE) {
    return (
      <Badge colorScheme={PRIMARY_COLOR}>
        Female <Icon as={BsGenderFemale} />
      </Badge>
    );
  }
};

export const toLocaleDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN").format(new Date(date));
};

export const isPathMatch = (currentPath, pathItem) => {
  const homePath = paths[DASH_BOARD].path;
  if (currentPath !== homePath && pathItem === homePath) {
    return false;
  }
  return currentPath.includes(pathItem);
};

export const vaccineToVaccineSelector = (vaccines) => {
  return vaccines.map((vaccine) => {
    return {
      id: vaccine.id,
      vaccineName: vaccine.vaccineName,
      label: vaccine.vaccineName,
      value: vaccine.id,
      img: vaccine.img,
    };
  });
};

export const customSelectionRender = (value) => {
  return (
    <Flex align="center">
      <Avatar src={value.img} size="sm" />
      <Box ml={2}>{value.label}</Box>
    </Flex>
  );
};

export const extractStatusFromCitizens = (citizens) => {
  const dosesData = _.chain(citizens)
    .countBy((citizen) => {
      if (citizen.doses >= SUPER_PROTECTED) {
        return SUPER_PROTECTED;
      }
      return citizen.doses;
    })
    .values()
    .value();
  const filteredStatus = _.chain(vaccineStatus)
    .filter((status) => !status.isHidden)
    .mapValues((status) => {
      return {
        label: status.label,
        chartBackgroundColor: status.chartBackgroundColor,
        chartBorderColor: status.chartBorderColor,
      };
    })
    .values()
    .value();
  const labels = _.chain(filteredStatus)
    .mapValues((status) => status.label)
    .values()
    .value();
  const backgroundColor = _.chain(filteredStatus)
    .mapValues((status) => status.chartBackgroundColor)
    .values()
    .value();
  const borderColor = _.chain(filteredStatus)
    .mapValues((status) => status.chartBorderColor)
    .values()
    .value();
  return {
    labels,
    datasets: [
      {
        data: dosesData,
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
    ],
  };
};

export const extractVaccineFromCitizens = (citizensWithVaccine, vaccines) => {
  const vaccinesCounts = _.chain(vaccines)
    .keyBy("id")
    .mapValues((vaccine) => 0)
    .value();
  const vaccineData = _.chain(citizensWithVaccine)
    .mapValues("doses")
    .values()
    .value();
  _.each(vaccineData, (citizenVaccines) => {
    _.each(citizenVaccines, (vaccine) => {
      vaccinesCounts[vaccine] += 1;
    });
  });
  const labels = _.chain(vaccines)
    .mapValues((vaccine) => vaccine.vaccineName)
    .values()
    .value();
  const colorConfigs = _.chain(vaccineStatus)
    .shuffle()
    .mapValues((status) => {
      return {
        backgroundColor: status.chartBackgroundColor,
        borderColor: status.chartBorderColor,
      };
    })
    .values()
    .value();
  const backgroundColor = _.chain(colorConfigs)
    .mapValues((status) => status.backgroundColor)
    .values()
    .value();
  const borderColor = _.chain(colorConfigs)
    .mapValues((status) => status.borderColor)
    .values()
    .value();
  const vaccineConvertedData = _.values(vaccinesCounts);
  return {
    labels,
    datasets: [
      {
        data: vaccineConvertedData,
        backgroundColor,
        borderColor,
        borderWidth: 2,
      },
    ],
  };
};

export const extractDosesOfTypeOnStatusDataSet = (
  citizensWithVaccine,
  vaccines
) => {
  const initialDoseByStatus = _.chain(vaccineStatus)
    .filter((status) => !status.isHidden)
    .mapValues((status) => 0)
    .values()
    .value();
  const vaccineColorConfigs = _.chain(vaccineStatus)
    .shuffle()
    .mapValues((vaccine) => {
      return {
        backgroundColor: vaccine.chartBackgroundColor,
        borderColor: vaccine.chartBorderColor,
      };
    })
    .value();
  const labels = _.chain(vaccineStatus)
    .filter((status) => !status.isHidden)
    .mapValues((status) => status.label)
    .values()
    .value();
  const vaccineData = _.chain(vaccines)
    .mapValues((vaccine, index) => {
      return {
        id: vaccine.id,
        label: vaccine.vaccineName,
        backgroundColor: vaccineColorConfigs[index].borderColor,
        data: [...initialDoseByStatus],
      };
    })
    .values()
    .keyBy("id")
    .value();
  _.chain(citizensWithVaccine)
    .mapValues((citizen) => {
      return {
        ...citizen,
        status:
          citizen.doses.length >= SUPER_PROTECTED
            ? SUPER_PROTECTED
            : citizen.doses.length,
      };
    })
    .values()
    .each((citizen) => {
      _.each(citizen.doses, (vaccineId) => {
        vaccineData[vaccineId].data[citizen.status] += 1;
      });
    })
    .value();
  const finalData = _.values(vaccineData);
  return {
    labels,
    datasets: finalData,
  };
};
