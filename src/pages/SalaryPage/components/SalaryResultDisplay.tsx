import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// 基础接口定义
interface IInsuranceAndFundResult {
  pension: number;
  medicalInsurance: number;
  unemploymentInsurance: number;
  injuryInsurance: number;
  maternityInsurance: number;
  housingFund: number;
  supplementaryFund: number;
  totalFund: number;
  totalHousingFund: number;
}

interface ICalculateResult {
  salaryBase: number;
  salaryAfterTaxAvg: number;
  insuranceAndFund: IInsuranceAndFundResult;
  insuranceAndFundOfCompany: IInsuranceAndFundResult;
}

interface SalaryResultDisplayProps {
  data: ICalculateResult;
  compact?: boolean; // true为单行模式，false为多行模式
}

export const SalaryResultDisplay: React.FC<SalaryResultDisplayProps> = ({
  data,
  compact = false,
}) => {
  const [expandedPersonal, setExpandedPersonal] = useState(false);
  const [expandedCompany, setExpandedCompany] = useState(false);

  // 格式化金额显示
  const formatMoney = (amount: number) => {
    return `¥${amount.toLocaleString("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // 保险和公积金详情组件
  const InsuranceDetails = ({
    data: fundData,
    title,
  }: {
    data: IInsuranceAndFundResult;
    title: string;
  }) => (
    <div className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
      <div className="font-medium text-gray-800">{title}</div>
      <div className="grid grid-cols-2 gap-2">
        <div>养老保险: {formatMoney(fundData.pension)}</div>
        <div>医疗保险: {formatMoney(fundData.medicalInsurance)}</div>
        <div>失业保险: {formatMoney(fundData.unemploymentInsurance)}</div>
        <div>工伤保险: {formatMoney(fundData.injuryInsurance)}</div>
        <div>生育保险: {formatMoney(fundData.maternityInsurance)}</div>
        <div>住房公积金: {formatMoney(fundData.housingFund)}</div>
        <div>补充公积金: {formatMoney(fundData.supplementaryFund)}</div>
        <div className="font-semibold text-blue-600">
          总公积金: {formatMoney(fundData?.totalHousingFund)}
        </div>
      </div>
      <div className="font-semibold text-red-600 border-t pt-1">
        总五险一金: {formatMoney(fundData?.totalFund)}
      </div>
    </div>
  );

  if (compact) {
    // 紧凑单行模式
    return (
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">基础工资:</span>
            <span className="font-semibold text-green-600">
              {formatMoney(data.salaryBase)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">平均税后:</span>
            <span className="font-semibold text-blue-600">
              {formatMoney(data.salaryAfterTaxAvg)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpandedPersonal(!expandedPersonal)}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {expandedPersonal ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              <span>
                个人五险一金: {formatMoney(data.insuranceAndFund?.totalFund)}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpandedCompany(!expandedCompany)}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {expandedCompany ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              <span>
                公司五险一金:{" "}
                {formatMoney(data.insuranceAndFundOfCompany?.totalFund)}
              </span>
            </button>
          </div>
        </div>

        {/* 展开的详情 */}
        {expandedPersonal && (
          <InsuranceDetails data={data.insuranceAndFund} title="个人承担部分" />
        )}
        {expandedCompany && (
          <InsuranceDetails
            data={data.insuranceAndFundOfCompany}
            title="公司承担部分"
          />
        )}
      </div>
    );
  }

  // 舒适多行模式
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
      {/* 基础信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">基础工资</div>
          <div className="text-2xl font-bold text-green-600">
            {formatMoney(data.salaryBase)}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">平均税后工资</div>
          <div className="text-2xl font-bold text-blue-600">
            {formatMoney(data.salaryAfterTaxAvg)}
          </div>
        </div>
      </div>

      {/* 五险一金部分 */}
      <div className="space-y-3">
        <div className="border rounded-lg">
          <button
            onClick={() => setExpandedPersonal(!expandedPersonal)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div>
                <div className="font-medium">个人五险一金</div>
                <div className="text-sm text-gray-600">每月从工资中扣除</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-red-600">
                {formatMoney(data.insuranceAndFund?.totalFund)}
              </span>
              {expandedPersonal ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </div>
          </button>
          {expandedPersonal && (
            <InsuranceDetails
              data={data.insuranceAndFund}
              title="个人承担明细"
            />
          )}
        </div>

        <div className="border rounded-lg">
          <button
            onClick={() => setExpandedCompany(!expandedCompany)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <div>
                <div className="font-medium">公司五险一金</div>
                <div className="text-sm text-gray-600">公司额外承担部分</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-purple-600">
                {formatMoney(data.insuranceAndFundOfCompany?.totalFund)}
              </span>
              {expandedCompany ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </div>
          </button>
          {expandedCompany && (
            <InsuranceDetails
              data={data.insuranceAndFundOfCompany}
              title="公司承担明细"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// 示例数据和使用演示
const SalaryDemo = () => {
  const [compactMode, setCompactMode] = useState(false);

  const sampleData: ICalculateResult = {
    salaryBase: 20000,
    salaryAfterTaxAvg: 16500.5,
    insuranceAndFund: {
      pension: 1600.0,
      medicalInsurance: 200.0,
      unemploymentInsurance: 100.0,
      injuryInsurance: 0.0,
      maternityInsurance: 0.0,
      housingFund: 2400.0,
      supplementaryFund: 0.0,
      totalFund: 4300.0,
      totalHousingFund: 2400.0,
    },
    insuranceAndFundOfCompany: {
      pension: 3200.0,
      medicalInsurance: 1800.0,
      unemploymentInsurance: 300.0,
      injuryInsurance: 160.0,
      maternityInsurance: 200.0,
      housingFund: 2400.0,
      supplementaryFund: 0.0,
      totalFund: 8060.0,
      totalHousingFund: 2400.0,
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            薪资结果展示组件
          </h1>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCompactMode(!compactMode)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              切换到{compactMode ? "多行" : "单行"}模式
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">
            当前模式:{" "}
            <span className="font-medium">
              {compactMode ? "紧凑单行模式" : "舒适多行模式"}
            </span>
          </div>
          <SalaryResultDisplay data={sampleData} compact={compactMode} />
        </div>
      </div>
    </div>
  );
};

export default SalaryDemo;
