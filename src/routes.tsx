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
import NamerPage from "./pages/NamerPage/NamerPage";
import HolidayPage from "./pages/HolidayPage/HolidayPage";
import { SalaryPage } from "./pages/SalaryPage/SalaryPage";

const routes = [
  {
    name: "🔄 排列组合",
    path: "/combination",
    element: <CombinationPage />,
  },
  // {

  //   path: "/demo",
  //   element: <DemoPage />,
  // },
  {
    name: "⚡ JavaScript转TypeScript",
    path: "/ts",
    element: <HomePage />,
  },
  {
    name: "📝 json格式化",
    path: "/json",
    element: <JsonFormatPage />,
  },
  {
    name: "⏰ 火锅定时器",
    path: "/timer",
    element: <TimerPage />,
  },
  {
    name: "📚 古诗词起名",
    path: "/namer",
    element: <NamerPage />,
  },
  {
    name: "📅 节假日可视化",
    path: "/holiday",
    element: <HolidayPage />,
  },
  {
    name: "💰 倒推工资",
    path: "/salary",
    element: <SalaryPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
];
export default routes as RouteConfig[];
