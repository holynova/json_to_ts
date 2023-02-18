import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
// import './MainPage.less'
// import  {log} from ''
interface Props {}

const MainPage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  return (
    <div className="MainPage">
      <h3>MainPage</h3>
      {routes.map((x) => {
        return (
          <div key={x.path}>
            <Link to={x.path}>{x.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default MainPage;
