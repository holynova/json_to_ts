import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

const MainPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {routes
          .filter((route) => route.name)
          .map((route) => (
            <Link
              key={route.path}
              to={route.path || "/"}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {route.name}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MainPage;
