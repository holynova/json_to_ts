import { RouteObject } from "react-router-dom";
import CombinationPage from "./pages/CombinationPage/CombinationPage";
import DemoPage from "./pages/DemoPage/DemoPage";
import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";
import JsonFormatPage from "./pages/JsonFormatPage/JsonFormatPage";
import TimerPage from "./pages/TimerPage/TimerPage";

const routes: RouteObject[] = [
  {
    path: "/combination",
    element: <CombinationPage />,
  },
  {
    path: "/demo",
    element: <DemoPage />,
  },
  {
    path: "/ts",
    element: <HomePage />,
  },
  {
    path: "/json",
    element: <JsonFormatPage />,
  },
  {
    path: "/timer",
    element: <TimerPage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
];
export default routes;
