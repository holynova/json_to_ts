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
export interface IInsuranceAndFund {
  pension: number; // 养老保险
  medicalInsurance: number; // 医疗保险
  unemploymentInsurance: number; // 失业保险
  injuryInsurance: number; // 工伤保险
  maternityInsurance: number; // 生育保险
  housingFund: number; // 住房公积金
  supplementaryFund: number; // 补充住房公积金
}
export interface IHousingFundRange {
  min: number;
  max: number;
}

export interface Result {}
