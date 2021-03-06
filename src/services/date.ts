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

  let blocks: string[] = [];

  blocks.push(`${hours} h`);
  blocks.push(`${minutes.toString().padStart(2, '0')} min`);

  return blocks.join(' ');
};

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getDayOfWeek = (date: Date) => {
  const day = date.getDay();
  return weekdays[day];
};
