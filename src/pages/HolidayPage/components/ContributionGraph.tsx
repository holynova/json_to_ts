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

interface ContributionGraphProps {
  year: number;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ year }) => {
  const [yearData, setYearData] = useState<YearData | null>(null);
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

    setYearData({
      year,
      weeks,
    });
  }, [year]);

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

  if (!yearData) {
    return null;
  }

  return (
    <div className="contribution-graph">
      <div className="contribution-graph__header">
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
      <div className="contribution-graph__grid">
        {yearData.weeks.map((week, weekIndex) => renderWeek(week, weekIndex))}
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
