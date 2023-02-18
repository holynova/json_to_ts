import React from "react";
import { Toaster } from "react-hot-toast";
//  import {} from 'antd'
// import './App.less'
// import  {log} from ''
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

interface Props {}

const router = createBrowserRouter(routes);

const App: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)r
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster></Toaster>
      {/* <HomePage></HomePage> */}
      {/* <CombinationPage /> */}
      {/* <DemoPage></DemoPage> */}
    </div>
  );
};

export default App;
