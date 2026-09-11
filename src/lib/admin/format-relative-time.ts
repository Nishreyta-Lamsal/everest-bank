const UNITS: Array<{ unit: Intl.RelativeTimeFormatUnit; ms: number }> = [
  { unit: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: 'day', ms: 24 * 60 * 60 * 1000 },
  { unit: 'hour', ms: 60 * 60 * 1000 },
  { unit: 'minute', ms: 60 * 1000 },
];

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatRelativeTime(isoDate: string) {
  const elapsed = new Date(isoDate).getTime() - Date.now();

  if (Number.isNaN(elapsed)) return '';

  for (const { unit, ms } of UNITS) {
    if (Math.abs(elapsed) >= ms) {
      return formatter.format(Math.round(elapsed / ms), unit);
    }
  }

  return formatter.format(Math.round(elapsed / 1000), 'second');
}
