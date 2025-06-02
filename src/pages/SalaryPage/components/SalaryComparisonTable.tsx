import React, { useCallback } from "react";
import { getResultByStep } from "../salaryUtils";
import { SalaryResultDisplay } from "./SalaryResultDisplay";

export const SalaryComparisonTable: React.FC = () => {
  const resultList = getResultByStep({
    start: 10000,
    end: 60000,
    step: 1000,
    housingFund: 0.07,
    supplementaryFund: 0,
  });

  const supplementaryFundResultList = getResultByStep({
    start: 10000,
    end: 60000,
    step: 1000,
    housingFund: 0.05,
    supplementaryFund: 0.05,
  });

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          无补充公积金
        </h2>
        <div className="space-y-4">
          {resultList.map((x, index) => (
            <SalaryResultDisplay key={index} data={x} compact />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          有补充公积金
        </h2>
        <div className="space-y-4">
          {supplementaryFundResultList.map((x, index) => (
            <SalaryResultDisplay key={index} data={x} compact />
          ))}
        </div>
      </div>
    </div>
  );
};
