import React, { useState } from "react";
import { AfterTaxCalculator } from "./components/AfterTaxCalculator";
import { SalaryComparisonTable } from "./components/SalaryComparisonTable";

export const SalaryPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-6xl mx-auto">
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
            税后工资计算
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`${
              activeTab === 1
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            工资对照表
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 0 ? <AfterTaxCalculator /> : <SalaryComparisonTable />}
      </div>
    </div>
  );
};
