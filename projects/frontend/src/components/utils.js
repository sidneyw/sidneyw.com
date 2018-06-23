const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatDate(unix) {
  const date = new Date(unix * 1000);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function yearMonthDay(unix) {
  const date = new Date(unix * 1000);
  const month = date.getMonth() + 1;
  const monthStr = month < 10 ? `0${month}` : month.toString();
  return `${date.getFullYear()}-${monthStr}-${date.getDate()}`;
}

export const dedupe = (...args) => {
  const set = new Set(args);
  return Array.from(set);
};
