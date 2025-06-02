import Salary, { ICalculateResult } from "easy-salary";
import { Config } from "./type";

export function getConfig(
  salary: number,
  housingFund = 0.07,
  supplementaryFund = 0,
): Config {
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

export function getResult(
  salary: number,
  housingFund = 0.07,
  supplementaryFund = 0,
): ICalculateResult {
  return new Salary(
    getConfig(salary, housingFund, supplementaryFund),
  ).calculate();
}

export function getResultByStep({
  start = 10000,
  end = 60000,
  step = 1000,
  housingFund = 0.05,
  supplementaryFund = 0,
}: {
  start: number;
  end: number;
  step: number;
  housingFund: number;
  supplementaryFund: number;
}): ICalculateResult[] {
  const res: ICalculateResult[] = [];
  for (let i = start; i <= end; i += step) {
    res.push(getResult(i, housingFund, supplementaryFund));
  }
  return res;
}

export function getBeforeTextSalary(
  afterRefund: number,
  housingFund = 0.07,
  supplementaryFund = 0,
) {
  // 设置二分查找的边界
  let left = afterRefund;
  let right = afterRefund * 2; // 假设税前工资不会超过税后工资的2倍

  // 设置精度
  const epsilon = 0.01;

  while (right - left > epsilon) {
    const mid = (left + right) / 2;
    const result = getResult(mid, housingFund, supplementaryFund);

    if (Math.abs(result.salaryAfterTaxAvg - afterRefund) < epsilon) {
      return mid;
    }

    if (result.salaryAfterTaxAvg < afterRefund) {
      left = mid;
    } else {
      right = mid;
    }
  }

  return (left + right) / 2;
}
