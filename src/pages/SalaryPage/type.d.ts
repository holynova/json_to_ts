import { IInsuranceAndFund } from "easy-salary";

// 传入的配置参数
export interface Config {
  salary?: number; // 基础工资
  specialAdditionalDeduction?: number; // 每月专项附加扣除 租房扣除
  yearEndAwardsNumber?: number; // 年终奖月数
  yearEndAwards?: number; // 年终奖 0表示默认使用 年终奖月数
  insuranceAndFundBase?: number; // 五险一金计算基础，为上一年度平均薪资，默认为salary
  startingSalary?: number; // 个税起征点
  insuranceAndFundRate?: IInsuranceAndFund; // 五险一金个人部分
  insuranceAndFundRateOfCompany?: IInsuranceAndFund; // 五险一金公司部分
  extraBonus?: number | number[]; // 每月额外奖金
  housingFundRange?: IHousingFundRange; // 公积金计算上下限
}

export interface IHousingFundRange {
  min: number;
  max: number;
}

export type { IInsuranceAndFund };

export interface Result {}
