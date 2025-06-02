import React, { useEffect, useState } from "react";
import {
  format,
  getYear,
  startOfYear,
  endOfYear,
  getDay,
  getWeek,
  eachDayOfInterval,
  isWeekend,
  getISOWeek,
  startOfWeek,
  endOfWeek,
  addWeeks,
  isSameYear,
} from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  isHoliday,
  getHolidayName,
  getDateType,
  DateType,
} from "../../../utils/holidays";
import "./ContributionGraph.scss";

interface YearData {
  year: number;
  weeks: Date[][];
}

const ContributionGraph: React.FC = () => {
  const [yearData, setYearData] = useState<YearData[]>([]);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    date: string;
    x: number;
    y: number;
  }>({
    show: false,
    date: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // 生成 2015-2025 年的年份数组（倒序）
    const years = Array.from({ length: 11 }, (_, i) => 2025 - i);

    // 为每一年生成按周排列的日期数组
    const yearDataArray = years.map((year) => {
      const yearDate = new Date(year, 0, 1);
      const yearStart = startOfYear(yearDate);
      const yearEnd = endOfYear(yearDate);

      // 获取该年的第一周和最后一周
      const firstWeekStart = startOfWeek(yearStart, { weekStartsOn: 1 });
      const lastWeekEnd = endOfWeek(yearEnd, { weekStartsOn: 1 });

      // 计算总周数
      const totalWeeks = Math.ceil(
        (lastWeekEnd.getTime() - firstWeekStart.getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );

      // 初始化周数组
      const weeks: Date[][] = Array(totalWeeks)
        .fill(null)
        .map(() => Array(7).fill(null));

      // 填充每一周的数据
      let currentWeekStart = firstWeekStart;
      for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
        // 获取当前周的每一天
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
          const currentDate = new Date(currentWeekStart);
          currentDate.setDate(currentDate.getDate() + dayIndex);

          // 只保留本年的日期
          if (isSameYear(currentDate, yearDate)) {
            weeks[weekIndex][dayIndex] = currentDate;
          }
        }
        // 移动到下一周
        currentWeekStart = addWeeks(currentWeekStart, 1);
      }

      return {
        year,
        weeks,
      };
    });

    setYearData(yearDataArray);
  }, []);

  const handleMouseEnter = (
    date: Date,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const formattedDate = format(date, "yyyy年MM月dd日 EEEE", { locale: zhCN });
    const holidayName = getHolidayName(date);
    const dateType = getDateType(date);
    let typeText = "";

    switch (dateType) {
      case "holiday":
        typeText = "法定假日";
        break;
      case "workday-weekend":
        typeText = "调休工作日";
        break;
      case "weekend":
        typeText = "周末";
        break;
      case "workday":
        typeText = "工作日";
        break;
    }

    const tooltipText = holidayName
      ? `${formattedDate}\n${holidayName}\n${typeText}`
      : `${formattedDate}\n${typeText}`;

    setTooltip({
      show: true,
      date: tooltipText,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, date: "", x: 0, y: 0 });
  };

  const getCellType = (date: Date): DateType => {
    return getDateType(date);
  };

  const renderDay = (date: Date | null, dayIndex: number) => {
    if (!date) {
      return (
        <div
          key={dayIndex}
          className="contribution-graph__cell contribution-graph__cell--empty"
        />
      );
    }

    return (
      <div
        key={dayIndex}
        className={`contribution-graph__cell contribution-graph__cell--${getCellType(
          date,
        )}`}
        onMouseEnter={(e) => handleMouseEnter(date, e)}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  const renderWeek = (week: (Date | null)[], weekIndex: number) => {
    return (
      <div key={weekIndex} className="contribution-graph__week">
        {week.map((date, dayIndex) => renderDay(date, dayIndex))}
      </div>
    );
  };

  return (
    <div className="contribution-graph">
      <div className="contribution-graph__header">
        <h2>贡献图</h2>
        <div className="contribution-graph__legend">
          <div className="contribution-graph__legend-item contribution-graph__legend-item--workday">
            工作日
          </div>
          <div className="contribution-graph__legend-item contribution-graph__legend-item--weekend">
            周末
          </div>
          <div className="contribution-graph__legend-item contribution-graph__legend-item--holiday">
            法定假日
          </div>
          <div className="contribution-graph__legend-item contribution-graph__legend-item--workday-weekend">
            调休工作日
          </div>
        </div>
      </div>
      <div className="contribution-graph__years">
        {yearData.map(({ year, weeks }) => (
          <div key={year} className="contribution-graph__year">
            <h3>{year}年</h3>
            <div className="contribution-graph__grid">
              {weeks.map((week, weekIndex) => renderWeek(week, weekIndex))}
            </div>
          </div>
        ))}
      </div>
      {tooltip.show && (
        <div
          className="contribution-graph__tooltip"
          style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
        >
          {tooltip.date}
        </div>
      )}
    </div>
  );
};

export default ContributionGraph;
