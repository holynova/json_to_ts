import React, { useEffect, useState } from "react";
import ContributionGraph from "./components/ContributionGraph";
import { getDateType } from "../../utils/holidays";
import { eachDayOfInterval, startOfYear, endOfYear } from "date-fns";
import "./HolidayPage.scss";

interface YearStats {
  year: number;
  totalDays: number;
  holidayDays: number;
  workdayWeekendDays: number;
  weekendDays: number;
  workDays: number;
}

const HolidayPage: React.FC = () => {
  const [yearStats, setYearStats] = useState<YearStats[]>([]);

  useEffect(() => {
    // 生成 2016-2025 年的年份数组（倒序）
    const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

    // 计算每年的统计数据
    const stats = years.map((year) => {
      const yearStart = startOfYear(new Date(year, 0, 1));
      const yearEnd = endOfYear(new Date(year, 0, 1));
      const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });

      let holidayDays = 0;
      let workdayWeekendDays = 0;
      let weekendDays = 0;
      let workDays = 0;

      allDays.forEach((date) => {
        const dateType = getDateType(date);
        switch (dateType) {
          case "holiday":
            holidayDays++;
            break;
          case "workday-weekend":
            workdayWeekendDays++;
            break;
          case "weekend":
            weekendDays++;
            break;
          case "workday":
            workDays++;
            break;
        }
      });

      return {
        year,
        totalDays: allDays.length,
        holidayDays,
        workdayWeekendDays,
        weekendDays,
        workDays,
      };
    });

    setYearStats(stats);
  }, []);

  return (
    <div className="holiday-page">
      <div className="holiday-page__header">
        <h1>节假日日历</h1>
      </div>
      <div className="holiday-page__content">
        {yearStats.map(
          ({
            year,
            totalDays,
            holidayDays,
            workdayWeekendDays,
            weekendDays,
            workDays,
          }) => (
            <div key={year} className="holiday-page__year-section">
              <div className="holiday-page__year-header">
                <h2>{year}年</h2>
                <div className="holiday-page__stats">
                  <span>全年天数：{totalDays}天</span>
                  <span>法定假日：{holidayDays}天</span>
                  <span>调休工作日：{workdayWeekendDays}天</span>
                  <span>普通周末：{weekendDays}天</span>
                  <span>普通工作日：{workDays}天</span>
                </div>
              </div>
              <ContributionGraph year={year} />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default HolidayPage;
