import { add, format, getDate, getYear, nextMonday, getWeek } from "date-fns";

export function calculateWeekMinMaxDates() {
  const today = new Date();

  const minDate = nextMonday(today);
  const minYear = getYear(minDate);
  const weekNumber = format(minDate, "ww");

  const maxDate = add(minDate, { days: 21 });
  const maxYear = getYear(maxDate);
  const maxWeekNumber = format(maxDate, "ww");

  return {
    min: `${minYear}-W${weekNumber}`,
    max: `${maxYear}-W${maxWeekNumber}`,
  };
}

export function calculateMonthMinDate() {
  const today = new Date();

  const canSelectCurrentMonth = getDate(today) <= 3;
  const nextMonth = add(today, { months: 1 });
  const month = canSelectCurrentMonth
    ? format(today, "MM")
    : format(nextMonth, "MM");

  const year = canSelectCurrentMonth ? getYear(today) : getYear(nextMonth);
  return {
    min: `${year}-${month}`,
  };
}

export const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function groupDataByDay(data) {
  const groupedData = new Array(7).fill(null);
  const firstWeekNumber = getWeek(new Date(data[0].startTime.slice(0, -1)));

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const startTime = new Date(item.startTime.slice(0, -1));
    const currentWeekNumber = getWeek(startTime);

    if (currentWeekNumber !== firstWeekNumber) {
      continue;
    }
    const dayOfWeek = startTime.getDay(); // Get the day of the week

    if (groupedData[dayOfWeek] === null) {
      groupedData[dayOfWeek] = [];
    }
    groupedData[dayOfWeek].push(item);
  }

  return groupedData;
}
