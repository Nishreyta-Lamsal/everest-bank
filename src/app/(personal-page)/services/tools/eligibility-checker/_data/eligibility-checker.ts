import { ROUTE } from '@/constants';

export type SliderRange = {
  min: number;
  max: number;
  step: number;
};

export type LoanTypeOption = {
  label: string;
  value: string;
};

export const loanTypeOptions: LoanTypeOption[] = [
  { label: 'First Home Loan', value: 'first-home-loan' },
  { label: 'Home Loan', value: 'home-loan' },
  { label: 'Vehicle Loan', value: 'vehicle-loan' },
  { label: 'Education Loan', value: 'education-loan' },
  { label: 'Agricultural Loan', value: 'agricultural-loan' },
  { label: 'Retail Loan', value: 'retail-loan' },
];

export const tenureRange: SliderRange = {
  min: 1,
  max: 30,
  step: 1,
};

export const interestRateRange: SliderRange = {
  min: 1,
  max: 20,
  step: 0.1,
};

export const eligibilityCheckerDefaults = {
  loanType: loanTypeOptions[0].value,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  tenure: 1,
  interestRate: 0,
};

export const maxEmiShareOfDisposableIncome = 0.5;

export const applicationHref = ROUTE.LOANS;
