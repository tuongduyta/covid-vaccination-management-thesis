import {
  UNPROTECTED,
  PARTIAL_PROTECTED,
  HIGHLY_PROTECTED,
  FULLY_PROTECTED,
  SUPER_PROTECTED,
  PRESERVED_FOR_LATER,
} from "../constant";

export const vaccineStatus = {
  [UNPROTECTED]: {
    color: "red",
    label: "Unprotected",
    chartBackgroundColor: "rgba(255, 99, 132, 0.2)",
    chartBorderColor: "rgba(255, 99, 132, 1)",
  },
  [PARTIAL_PROTECTED]: {
    color: "orange",
    label: "Partial protected",
    chartBackgroundColor: "rgba(255, 159, 64, 0.2)",
    chartBorderColor: "rgba(255, 159, 64, 1)",
  },
  [HIGHLY_PROTECTED]: {
    color: "yellow",
    label: "Highly protected",
    chartBackgroundColor: "rgba(255, 206, 86, 0.2)",
    chartBorderColor: "rgba(255, 206, 86, 1)",
  },
  [FULLY_PROTECTED]: {
    color: "green",
    label: "Fully protected",
    chartBackgroundColor: "rgba(75, 192, 192, 0.2)",
    chartBorderColor: "rgba(75, 192, 192, 1)",
  },
  [SUPER_PROTECTED]: {
    color: "blue",
    label: "Super protected",
    chartBackgroundColor: "rgba(54, 162, 235, 0.2)",
    chartBorderColor: "rgba(54, 162, 235, 1)",
  },
  [PRESERVED_FOR_LATER]: {
    isHidden: true,
    color: "purple",
    label: "Preserved for later",
    chartBackgroundColor: "rgba(153, 102, 255, 0.2)",
    chartBorderColor: "rgba(153, 102, 255, 1)",
  },
};
