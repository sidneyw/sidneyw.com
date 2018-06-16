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

export default {};
