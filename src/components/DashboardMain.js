import React from "react";
import { useSelector } from "react-redux";
// REDUCERS
import { appSelector } from "../features/appSlice/appSlice";
// COMPONENTS
import Loader from "./layout/Loader";

import PersonalInfo from "./page/PersonalInfo";
const DashboardMain = () => {
  const { userData } = useSelector(appSelector);

  if (!userData) {
    return <Loader />;
  }
  return <>{!userData.personal_information?.length && <PersonalInfo />}</>;
};

export default DashboardMain;
