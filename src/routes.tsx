import React from "react";
import { RouteObject } from "react-router-dom";

interface RouteConfig {
  name?: string;
  path?: string;
  element?: React.ReactNode;
  children?: RouteConfig[];
}

import CombinationPage from "./pages/CombinationPage/CombinationPage";
import DemoPage from "./pages/DemoPage/DemoPage";
import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";
import JsonFormatPage from "./pages/JsonFormatPage/JsonFormatPage";
import TimerPage from "./pages/TimerPage/TimerPage";

const routes = [
  {
    name: "排列组合",
    path: "/combination",
    element: <CombinationPage />,
  },
  // {

  //   path: "/demo",
  //   element: <DemoPage />,
  // },
  {
    name: "JavaScript to TypeScript",
    path: "/ts",
    element: <HomePage />,
  },
  {
    name: "json format",
    path: "/json",
    element: <JsonFormatPage />,
  },
  {
    name: "火锅定时器Timer",
    path: "/timer",
    element: <TimerPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
];
export default routes as RouteConfig[];
