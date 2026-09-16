const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;


export function formatUpdatedLabel(isoDate: string) {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) return '';

  const elapsed = Date.now() - timestamp;

  if (elapsed < HOUR) return 'updated just now';
  if (elapsed < DAY) {
    const hours = Math.floor(elapsed / HOUR);

    return `updated ${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (elapsed < WEEK) {
    const days = Math.floor(elapsed / DAY);

    return days === 1 ? 'updated yesterday' : `updated ${days} days ago`;
  }

  const weeks = Math.floor(elapsed / WEEK);

  if (weeks < 5) return `updated ${weeks} week${weeks === 1 ? '' : 's'} ago`;

  return `updated on ${new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}
