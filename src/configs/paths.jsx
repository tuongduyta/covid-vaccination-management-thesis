import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";

import {
  DASH_BOARD,
  MANAGE_CITIZEN,
  ADD_CITIZEN,
  EDIT_CITIZEN,
  LOGIN,
  DETAIL_CITIZEN,
  MANAGE_VACCINATION,
  ADD_VACCINATION,
  EDIT_VACCINATION,
  DETAIL_VACCINATION,
} from "../constant";
import DashBoard from "../components/pages/dash-board/index.";
import ManageCitizen from "../components/pages/manage-citizen";
import AddCitizen from "../components/pages/manage-citizen/add-citizen";
import EditCitizen from "../components/pages/manage-citizen/edit-citizen";
import DetailCitizen from "../components/pages/manage-citizen/detail-citizen";
import ManageVaccination from "../components/pages/manage-vaccination";
import AddVaccination from "../components/pages/manage-vaccination/add-vaccination";
import EditVaccination from "../components/pages/manage-vaccination/edit-vaccination";
import DetailVaccination from "../components/pages/manage-vaccination/detail-vaccination";
import Login from "../components/pages/login";

export const paths = {
  [DASH_BOARD]: {
    label: "Dash Board",
    path: "/",
    element: <DashBoard />,
    icon: MdOutlineSpaceDashboard,
  },
  [MANAGE_CITIZEN]: {
    label: "Manage Citizen",
    path: "/manageCitizen",
    element: <ManageCitizen />,
    icon: BsPeople,
  },
  [ADD_CITIZEN]: {
    label: "Add Citizen",
    path: "/manageCitizen/addCitizen",
    element: <AddCitizen />,
    isHidden: true,
  },
  [EDIT_CITIZEN]: {
    label: "Edit Citizen",
    path: "/manageCitizen/editCitizen/:citizenId",
    pathWithNoParams: "/manageCitizen/editCitizen",
    element: <EditCitizen />,
    isHidden: true,
  },
  [DETAIL_CITIZEN]: {
    label: "Detail Citizen",
    path: "/manageCitizen/detailCitizen/:citizenId",
    pathWithNoParams: "/manageCitizen/detailCitizen",
    element: <DetailCitizen />,
    isHidden: true,
  },
  [MANAGE_VACCINATION]: {
    label: "Manage Vaccination",
    path: "/manageVaccination",
    element: <ManageVaccination />,
    icon: GiMedicines,
  },
  [ADD_VACCINATION]: {
    label: "Add Vaccination",
    path: "/manageVaccination/addVaccination",
    element: <AddVaccination />,
    isHidden: true,
  },
  [EDIT_VACCINATION]: {
    label: "Edit Vaccination",
    path: "/manageVaccination/editVaccination/:vaccineId",
    pathWithNoParams: "/manageVaccination/editVaccination",
    element: <EditVaccination />,
    isHidden: true,
  },
  [DETAIL_VACCINATION]: {
    label: "Detail Vaccination",
    path: "/manageVaccination/detailVaccination/:vaccineId",
    pathWithNoParams: "/manageVaccination/detailVaccination",
    element: <DetailVaccination />,
    isHidden: true,
  },
  [LOGIN]: {
    label: "Login",
    path: "/login",
    element: <Login />,
    isHidden: true,
  },
};
