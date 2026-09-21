import type { RangeFieldSpec } from '../../_lib/calculator-settings';
import type { FdCalculatorConfig } from '@/types/admin';

export const fdRangeFields: RangeFieldSpec<FdCalculatorConfig>[] = [
  {
    name: 'deposit_amount',
    title: 'Deposit amount',
    description: 'The deposit range a visitor can choose from.',
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
    description: 'How long, in years, the deposit can be held for.',
    unit: 'years',
    step: 1,
  },
];
