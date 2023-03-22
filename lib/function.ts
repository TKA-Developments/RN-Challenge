export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDateReadable = (date: Date) => {
  return (
    days[date.getDay()] +
    ", " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear()
  );
};

export const limitDetailLength = (detail: string, limit_length: number) => {
  if (detail.length > limit_length) {
    return detail.substring(0, limit_length) + "...";
  }
  return detail;
};

export function convertDatetimeToString(date: Date) {
  const a_day = 86400000;
  const today = new Date();
  const timestampDiff = date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const difference = timestampDiff / a_day;
  if (difference === 0) {
    return "today";
  }
  if (difference === 1) {
    return "tomorrow";
  }
  if (difference > 1 && difference < 7) {
    return days[date.getDay()];
  }
  if (difference >= 7 && difference < 14) {
    return "in a week";
  }
  if (difference >= 14 && difference < 30) {
    return "in a couple of weeks";
  } else {
    return date.toLocaleDateString();
  }
}
