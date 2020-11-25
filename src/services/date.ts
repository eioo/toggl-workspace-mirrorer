export const getFirstDayOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const formatDuration = (ms: number) => {
  let secNum = ms / 1000; // don't forget the second param
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = secNum - hours * 3600 - minutes * 60;

  return [hours, minutes, seconds]
    .map((i) => i.toString().padStart(2, '0'))
    .join(':');
};

const weekdays = new Array(
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
);

export const getDayOfWeek = (date: Date) => {
  const day = date.getDay();
  return weekdays[day];
};
