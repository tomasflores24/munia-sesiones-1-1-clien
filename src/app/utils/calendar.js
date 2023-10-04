import { add, format, getDate, getYear, nextMonday } from "date-fns";

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
