import React, { useState } from "react";
import { getResultByStep } from "../salaryUtils";
import { SalaryResultDisplay } from "./SalaryResultDisplay";

export const SalaryComparisonTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const resultList = getResultByStep({
    start: 3000,
    end: 60000,
    step: 1000,
    housingFund: 0.07,
    supplementaryFund: 0,
  });

  const supplementaryFundResultList = getResultByStep({
    start: 3000,
    end: 60000,
    step: 1000,
    housingFund: 0.05,
    supplementaryFund: 0.05,
  });

  return (
    <div className="p-4 space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab(0)}
            className={`${
              activeTab === 0
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            无补充公积金
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`${
              activeTab === 1
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            有补充公积金
          </button>
        </nav>
      </div>

      <div className="space-y-4">
        {activeTab === 0
          ? resultList.map((x, index) => (
              <SalaryResultDisplay
                key={index}
                data={x}
                compact
                showChart={false}
              />
            ))
          : supplementaryFundResultList.map((x, index) => (
              <SalaryResultDisplay
                key={index}
                data={x}
                compact
                showChart={false}
              />
            ))}
      </div>
    </div>
  );
};
