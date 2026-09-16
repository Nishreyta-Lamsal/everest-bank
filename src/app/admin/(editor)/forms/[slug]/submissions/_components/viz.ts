/**
 * Chart parameters for the responses dashboard.
 *
 * Every chart here plots one series - counts of one field's answers - so
 * identity comes from the category label beside each mark, not from hue. That
 * means one hue throughout, no legend, and no categorical palette to validate
 * for colourblind separation. The hue below passed the palette validator's
 * lightness, chroma, and contrast checks against a light chart surface.
 *
 * The CMS renders light-only, so there is no dark set.
 */
export const VIZ = {
  series: '#2a78d6',
  /** Unfilled remainder of a bar track; one step off the surface. */
  track: '#eef2f7',
  grid: '#e7e7e4',
  textPrimary: '#0b0b0b',
  textSecondary: '#52514e',
  surface: '#ffffff',
} as const;

/** Bars are capped rather than filling their slot, so the band keeps some air. */
export const BAR_THICKNESS = 20;

export function percent(count: number, total: number) {
  if (!total) return 0;

  return Math.round((count / total) * 100);
}
