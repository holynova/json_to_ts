import React from "react";
import ContributionGraph from "./components/ContributionGraph";
import "./HolidayPage.scss";

const HolidayPage: React.FC = () => {
  return (
    <div className="holiday-page">
      <h1>节假日日历</h1>
      <div className="holiday-page__content">
        <ContributionGraph />
      </div>
    </div>
  );
};

export default HolidayPage;
