import { CITIZEN_DOSE_CHART, BAR_CHART, VACCINE_CHART } from "../constant";

export const chartOptions = {
  [CITIZEN_DOSE_CHART]: {
    plugins: {
      title: {
        display: true,
        text: "Number of citizens on vaccination's statuses",
        position: "bottom",
        padding: {
          top: 40,
        },
        font: {
          size: 16,
        },
      },
    },
  },
  [VACCINE_CHART]: {
    plugins: {
      title: {
        display: true,
        text: "Number of doses on vaccine types",
        position: "bottom",
        padding: {
          top: 40,
        },
        font: {
          size: 16,
        },
      },
    },
  },
  [BAR_CHART]: {
    plugins: {
      title: {
        display: true,
        text: "Number of vaccine type on statuses",
        position: "bottom",
        padding: {
          top: 40,
        },
        font: {
          size: 16,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
};
