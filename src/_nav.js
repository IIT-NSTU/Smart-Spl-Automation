import React from "react";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer } from "@coreui/icons";
import { CNavItem } from "@coreui/react";

export const _navTeacher = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard/teacher",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: "Announcements",
  //   to: "/announcements",
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: "Join to SPL",
    to: "/join/spl",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
];

export const _navStudent = [
  {
    component: CNavItem,
    name: "Running Projects",
    to: "/dashboard/student",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavItem,
  //   name: "Announcements",
  //   to: "/announcements",
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },

  {
    component: CNavItem,
    name: "Join to SPL",
    to: "/join/spl",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report Generator",
    to: "/reportgenerator",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
];
