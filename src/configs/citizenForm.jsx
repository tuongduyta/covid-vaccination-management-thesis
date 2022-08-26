import { BsPersonBadge, BsGenderAmbiguous } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { FiHome } from "react-icons/fi";
import { GiLoveInjection } from "react-icons/gi";

import { GENDER_MALE, GENDER_FEMALE } from "../constant";

export const citizenFormConfigs = [
  {
    name: "firstName",
    label: "First name",
    icon: BsPersonBadge,
    defaultValue: "Bao",
  },
  {
    name: "lastName",
    label: "Last name",
    icon: MdFamilyRestroom,
  },
  {
    name: "gender",
    label: "Gender",
    icon: BsGenderAmbiguous,
    defaultValue: GENDER_MALE,
    fieldType: "select",
    options: [
      {
        label: "Male",
        value: GENDER_MALE,
      },
      {
        label: "Female",
        value: GENDER_FEMALE,
      },
    ],
  },
  {
    name: "dob",
    label: "Date of birth",
    icon: FaBirthdayCake,
    fieldType: "date",
  },
  {
    name: "idNumber",
    label: "Identification number",
    icon: HiOutlineIdentification,
  },
  {
    name: "address",
    label: "Address",
    icon: FiHome,
  },
  {
    name: "doses",
    label: "Doses",
    icon: GiLoveInjection,
    isHidden: true,
  },
];
