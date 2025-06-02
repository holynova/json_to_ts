import holidays2016 from "./holidayData/2016.json";
import holidays2017 from "./holidayData/2017.json";
import holidays2018 from "./holidayData/2018.json";
import holidays2019 from "./holidayData/2019.json";
import holidays2020 from "./holidayData/2020.json";
import holidays2021 from "./holidayData/2021.json";
import holidays2022 from "./holidayData/2022.json";
import holidays2023 from "./holidayData/2023.json";
import holidays2024 from "./holidayData/2024.json";
import holidays2025 from "./holidayData/2025.json";
import { eachDayOfInterval, isWeekend } from "date-fns";

interface Holiday {
  date: string;
  name: string;
  isWorkday?: boolean;
}

interface RawHoliday {
  name: string;
  range: string[];
  type: "holiday" | "workingday";
}

function expandHolidayRanges(raw: RawHoliday[]): Holiday[] {
  const result: Holiday[] = [];
  raw.forEach((item) => {
    if (item.range && Array.isArray(item.range) && item.range.length === 2) {
      const [start, end] = item.range;
      const days = eachDayOfInterval({
        start: new Date(start),
        end: new Date(end),
      });
      days.forEach((day) => {
        result.push({
          date: day.toISOString().split("T")[0],
          name: item.name,
          isWorkday: item.type === "workingday",
        });
      });
    } else if (
      item.range &&
      Array.isArray(item.range) &&
      item.range.length === 1
    ) {
      // 处理单日假期
      result.push({
        date: item.range[0],
        name: item.name,
        isWorkday: item.type === "workingday",
      });
    }
  });
  return result;
}

const allHolidays: Holiday[] = [
  ...expandHolidayRanges(holidays2016 as RawHoliday[]),
  ...expandHolidayRanges(holidays2017 as RawHoliday[]),
  ...expandHolidayRanges(holidays2018 as RawHoliday[]),
  ...expandHolidayRanges(holidays2019 as RawHoliday[]),
  ...expandHolidayRanges(holidays2020 as RawHoliday[]),
  ...expandHolidayRanges(holidays2021 as RawHoliday[]),
  ...expandHolidayRanges(holidays2022 as RawHoliday[]),
  ...expandHolidayRanges(holidays2023 as RawHoliday[]),
  ...expandHolidayRanges(holidays2024 as RawHoliday[]),
  ...expandHolidayRanges(holidays2025 as RawHoliday[]),
];

export type DateType = "holiday" | "workday-weekend" | "weekend" | "workday";

// 判断是否为调休工作日
function isWorkdayWeekend(name: string): boolean {
  return (
    name.includes("调休") || name.includes("补班") || name.includes("补休")
  );
}

export function getDateType(date: Date): DateType {
  const dateStr = date.toISOString().split("T")[0];
  const holiday = allHolidays.find((holiday) => holiday.date === dateStr);

  if (holiday) {
    if (holiday.isWorkday) {
      return "workday-weekend"; // 调休工作日
    }
    return "holiday"; // 法定假日
  }

  if (isWeekend(date)) {
    return "weekend"; // 普通周末
  }

  return "workday"; // 普通工作日
}

export function isHoliday(date: Date): boolean {
  return getDateType(date) === "holiday";
}

export function getHolidayName(date: Date): string | null {
  const dateStr = date.toISOString().split("T")[0];
  const holiday = allHolidays.find((holiday) => holiday.date === dateStr);
  return holiday ? holiday.name : null;
}
