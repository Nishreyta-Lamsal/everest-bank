import { ROUTE } from '@/constants';

export type CalculatorTab = {
  label: string;
  href: string;
};

export const calculatorTabs: CalculatorTab[] = [
  { label: 'EMI Calculator', href: ROUTE.EMI_CALCULATOR },
  { label: 'FD Calculator', href: ROUTE.FD_CALCULATOR },
  { label: 'Eligibility Checker', href: ROUTE.ELIGIBILITY_CHECKER },
];
