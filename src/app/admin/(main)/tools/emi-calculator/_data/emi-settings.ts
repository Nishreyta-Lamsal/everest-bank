import type { RangeFieldSpec } from '../../_lib/calculator-settings';
import type { EmiCalculatorConfig } from '@/types/admin';

export const emiRangeFields: RangeFieldSpec<EmiCalculatorConfig>[] = [
  {
    name: 'loan_amount',
    title: 'Loan amount',
    description: 'The borrowing range a visitor can choose from.',
    unit: 'Rs.',
    step: 10000,
  },
  {
    name: 'interest_rate',
    title: 'Interest rate',
    description: 'The annual rate range offered on the calculator.',
    unit: '%',
    step: 0.1,
  },
  {
    name: 'tenure_years',
    title: 'Tenure',
    description: 'How long, in years, the loan can be repaid over.',
    unit: 'years',
    step: 1,
  },
];
