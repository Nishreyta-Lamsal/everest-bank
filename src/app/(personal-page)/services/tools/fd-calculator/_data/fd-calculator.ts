export type TenureUnit = 'years' | 'months';

export type CompoundingFrequency = 'quarterly' | 'half-yearly' | 'yearly';

export type SliderRange = {
  min: number;
  max: number;
  step: number;
};

export type CompoundingOption = {
  label: string;
  value: CompoundingFrequency;
  periodsPerYear: number;
};

export const depositAmountRange: SliderRange = {
  min: 10000,
  max: 10000000,
  step: 10000,
};

export const interestRateRange: SliderRange = {
  min: 1,
  max: 15,
  step: 0.1,
};

export const tenureRanges: Record<TenureUnit, SliderRange> = {
  years: { min: 1, max: 20, step: 1 },
  months: { min: 1, max: 240, step: 1 },
};

export const tenureUnitOptions: { label: string; value: TenureUnit }[] = [
  { label: 'Years', value: 'years' },
  { label: 'Months', value: 'months' },
];

export const compoundingOptions: CompoundingOption[] = [
  { label: 'Quarterly', value: 'quarterly', periodsPerYear: 4 },
  { label: 'Half-Yearly', value: 'half-yearly', periodsPerYear: 2 },
  { label: 'Yearly', value: 'yearly', periodsPerYear: 1 },
];

export const fdCalculatorDefaults = {
  depositAmount: 10000,
  interestRate: 0,
  tenure: 0,
  tenureUnit: 'years' as TenureUnit,
  compounding: 'quarterly' as CompoundingFrequency,
};
