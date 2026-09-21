import type { CalculatorRange, EmiCalculatorConfig } from '@/types/admin';

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

export const yearlyBreakdownYears = [2026, 2027, 2028];

export const emiCalculatorFallback: EmiCalculatorConfig = {
  loan_amount: { min: 100000, max: 20000000, default: 2500000 },
  interest_rate: { min: 6, max: 18, default: 8 },
  tenure_years: { min: 1, max: 25, default: 10 },
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
