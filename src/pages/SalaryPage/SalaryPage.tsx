import React, { useCallback } from "react";
import Salary, { ICalculateResult, ICalculateData } from "easy-salary";
import { DebugPanel } from "../../common/components/DebugPanel";
import { Config } from "./type";
import { SalaryResultDisplay } from "./components/SalaryResultDisplay";

function getName() {}

function getConfig(salary: number, housingFund = 0.07, supplementaryFund = 0) {
  const config: Config = {
    salary, // 月薪
    specialAdditionalDeduction: 0, // 每月专项附加扣除 租房扣除
    yearEndAwardsNumber: 0, // 年终奖月数
    startingSalary: 5000, // 个税起征点
    insuranceAndFundRate: {
      pension: 0.08, // 养老保险 个人缴费费率为8%;
      medicalInsurance: 0.02, // 医疗保险 个人缴费比例为2%;
      unemploymentInsurance: 0.005, // 失业保险 个人缴费比例为0.5%;
      housingFund, // 住房公积金 7%
      supplementaryFund, // 补充公积金 5%
      injuryInsurance: 0.01,
      maternityInsurance: 0.01,
    },
  };
  return config;
}

function getSimpleResult(res: ICalculateResult) {
  return {
    salaryBase: res.salaryBase,
    salaryAfterTaxAvg: res.salaryAfterTaxAvg,
    insuranceAndFund: res.insuranceAndFund,
    companyInsuranceAndFund: res.insuranceAndFundOfCompany,
  };
}

export const SalaryPage = () => {
  const renderResult = () => {};
  const renderTablePart = useCallback(() => {
    const start = 10000;
    const step = 5000;
    const end = 60000;

    const resultList = [];
    const supplementaryFundResultList = [];

    for (let i = start; i <= end; i += step) {
      const config = getConfig(i, 0.07, 0);
      const configWithSupplementaryHouseFund = getConfig(i, 0.05, 0.05);
      // const res: ICalculateResult = new Salary(config).calculate();

      // resultList.push(getSimpleResult(res));
      resultList.push(new Salary(config).calculate());
      supplementaryFundResultList.push(
        new Salary(configWithSupplementaryHouseFund).calculate(),
      );
    }
    return (
      <>
        <h1>无补充公积金</h1>
        {resultList.map((x) => {
          return <SalaryResultDisplay data={x} compact></SalaryResultDisplay>;
        })}
        <h1>有补充公积金</h1>
        {supplementaryFundResultList.map((x) => {
          return <SalaryResultDisplay data={x} compact></SalaryResultDisplay>;
        })}
      </>
    );
  }, []);

  return <>{renderTablePart()}</>;
};
