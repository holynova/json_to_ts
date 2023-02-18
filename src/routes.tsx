import { RouteObject } from "react-router-dom";
import CombinationPage from "./pages/CombinationPage/CombinationPage";
import DemoPage from "./pages/DemoPage/DemoPage";
import HomePage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";

const routes: RouteObject[] = [
  {
    name: "排列组合",
    path: "/combination",
    element: <CombinationPage />,
  },
  {
    name: "demo",

    path: "/demo",
    element: <DemoPage />,
  },
  {
    name: "js to ts",
    path: "/ts",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <MainPage />,
  },
  // {
  //   path: "/",
  //   element: <MainPage>
  // },
];
export default routes;
