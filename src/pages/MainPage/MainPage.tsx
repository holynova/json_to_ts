import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import "antd/dist/reset.css";
import "./MainPage.less";
import { Switch } from "antd";

interface RouteItem {
  path: string;
  name: string;
  description?: string;
}

const MainPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRoutes = routes.filter((route) => route.path !== "/") as RouteItem[];

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  return (
    <div className={`MainPage ${isDarkMode ? "dark" : ""}`}>
      <div style={{ position: "absolute", top: 24, right: 24 }}>
        <Switch
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
      </div>

      <div className="header">
        <h1>JSON to TypeScript</h1>
        <div className="description">
          Convert JSON to TypeScript interfaces with ease
        </div>
      </div>

      <div className="nav-grid">
        {navRoutes.map((route) => (
          <Link to={route.path} key={route.path} className="nav-card">
            <div className="title">{route.name}</div>
            {route.description && (
              <div className="description">{route.description}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
