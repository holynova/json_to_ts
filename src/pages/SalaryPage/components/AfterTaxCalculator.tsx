import React, { useState, useRef, useEffect } from "react";
import { getResult, getBeforeTextSalary } from "../salaryUtils";
import { SalaryResultDisplay } from "./SalaryResultDisplay";

export const AfterTaxCalculator: React.FC = () => {
  const [afterTaxSalary, setAfterTaxSalary] = useState<number>(10000);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAfterTaxSalary(isNaN(value) ? 0 : value);
  };

  const result1 = getResult(
    getBeforeTextSalary(afterTaxSalary, 0.07, 0),
    0.07,
    0,
  );
  const result2 = getResult(
    getBeforeTextSalary(afterTaxSalary, 0.05, 0.05),
    0.05,
    0.05,
  );

  return (
    <div className="p-4 space-y-6">
      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入税后工资
        </label>
        <input
          ref={inputRef}
          type="number"
          value={afterTaxSalary || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="请输入税后工资"
        />
      </div>

      {afterTaxSalary > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              无补充公积金方案
            </h2>
            <SalaryResultDisplay data={result1} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              有补充公积金方案
            </h2>
            <SalaryResultDisplay data={result2} />
          </div>
        </div>
      )}
    </div>
  );
};
