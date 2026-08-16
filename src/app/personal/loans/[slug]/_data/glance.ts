export type LoanGlanceItem = {
  label: string;
  value: string;
};

export const glanceItems: LoanGlanceItem[] = [
  { label: 'Maximum Loan Amount', value: 'Up to NPR 50 Lakh+' },
  { label: 'Interest Rate', value: 'Starting from 8% p.a.' },
  { label: 'Project Financing', value: 'Up to 75% of project cost' },
  {
    label: 'Loan Tenure',
    value: 'Flexible terms based on financing requirements',
  },
  {
    label: 'Processing Time',
    value: 'Fast and efficient application review',
  },
  { label: 'Security Requirement', value: 'Collateral as per bank policy' },
  {
    label: 'Repayment Options',
    value: 'Structured to suit your cash flow cycle',
  },
];
