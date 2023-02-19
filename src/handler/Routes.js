import React from "react";
import { DashboardIcon, MicrophoneIcon, PageIcon, SettingIcon } from "./Icon";

const MainRoutes = [
  {
    id: 1,
    name: "dashboard",
    path: "",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    name: "page",
    path: "/dashboard/page",
    icon: <PageIcon />,
  },
  {
    id: 3,
    name: "settings",
    path: "/dashboard/settings",
    icon: <SettingIcon />,
  },
  {
    id: 4,
    name: "announncement",
    path: "/dashboard/announcement",
    icon: <MicrophoneIcon />,
  },
];

export { MainRoutes };
