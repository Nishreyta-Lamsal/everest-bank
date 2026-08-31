export type TenureUnit = 'years' | 'months';

export type SliderRange = {
  min: number;
  max: number;
  step: number;
};

export const loanAmountRange: SliderRange = {
  min: 100000,
  max: 10000000,
  step: 50000,
};

export const interestRateRange: SliderRange = {
  min: 1,
  max: 25,
  step: 0.1,
};

export const tenureRanges: Record<TenureUnit, SliderRange> = {
  years: { min: 1, max: 30, step: 1 },
  months: { min: 1, max: 360, step: 1 },
};

export const tenureUnitOptions: { label: string; value: TenureUnit }[] = [
  { label: 'Years', value: 'years' },
  { label: 'Months', value: 'months' },
];

export const yearlyBreakdownYears = [2026, 2027, 2028];

export const emiCalculatorDefaults = {
  loanAmount: 0,
  interestRate: 0,
  tenure: 0,
  tenureUnit: 'years' as TenureUnit,
};
