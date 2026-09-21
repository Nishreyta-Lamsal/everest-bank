import type { CalculatorRange, FdCalculatorConfig } from '@/types/admin';

export type TenureUnit = 'years' | 'months';

export type SliderRange = {
  min: number;
  max: number;
  step: number;
};

export const tenureUnitOptions: { label: string; value: TenureUnit }[] = [
  { label: 'Years', value: 'years' },
  { label: 'Months', value: 'months' },
];

export const periodsPerYear = 1;

export const fdCalculatorFallback: FdCalculatorConfig = {
  deposit_amount: { min: 10000, max: 50000000, default: 500000 },
  interest_rate: { min: 5, max: 10, default: 9 },
  tenure_years: { min: 1, max: 10, default: 3 },
};

export function toSliderRange(
  range: CalculatorRange,
  step: number,
): SliderRange {
  return { min: range.min, max: range.max, step };
}

export function toTenureRanges(
  range: CalculatorRange,
): Record<TenureUnit, SliderRange> {
  return {
    years: { min: range.min, max: range.max, step: 1 },
    months: { min: range.min * 12, max: range.max * 12, step: 1 },
  };
}
