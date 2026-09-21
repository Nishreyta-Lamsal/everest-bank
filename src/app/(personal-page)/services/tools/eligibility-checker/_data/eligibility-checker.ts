import { ROUTE } from '@/constants';

import type {
  CalculatorRange,
  EligibilityCalculatorConfig,
} from '@/types/admin';

export type SliderRange = {
  min: number;
  max: number;
  step: number;
};

export type LoanTypeOption = {
  label: string;
  value: string;
};


export const tenureRange: SliderRange = {
  min: 1,
  max: 30,
  step: 1,
};

export const eligibilityCheckerFallback: EligibilityCalculatorConfig = {
  gross_monthly_income: { min: 20000, max: 2000000, default: 80000 },
  interest_rate: { min: 6, max: 18, default: 8 },
  loan_types: [
    { slug: 'agriculture-loan', label: 'Agriculture Loan' },
    { slug: 'home-loan', label: 'Home Loan' },
    { slug: 'auto-loan', label: 'Auto Loan' },
    { slug: 'personal-loan', label: 'Personal Loan' },
  ],
  default_loan_type: 'agriculture-loan',
};

export function toSliderRange(
  range: CalculatorRange,
  step: number,
): SliderRange {
  return { min: range.min, max: range.max, step };
}

export function toLoanTypeOptions(
  config: EligibilityCalculatorConfig,
): LoanTypeOption[] {
  return config.loan_types.map((loanType) => ({
    label: loanType.label,
    value: loanType.slug,
  }));
}

export const eligibilityCheckerDefaults = {
  monthlyExpenses: 0,
  tenure: 1,
};

export const maxEmiShareOfDisposableIncome = 0.5;

export const applicationHref = ROUTE.LOANS;
