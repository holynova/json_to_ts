import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import HomePage from "./pages/HomePage/HomePage";
//  import {} from 'antd'
// import './App.less'
// import  {log} from ''
import { Toaster } from "react-hot-toast";

interface Props {}

const App: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  return (
    <div className="App">
      <Toaster></Toaster>
      <HomePage></HomePage>
    </div>
  );
};

export default App;
