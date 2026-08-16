export type LoanApplyChecklistItem = {
  title: string;
  description: string;
};

export const loanApplyChecklist: LoanApplyChecklistItem[] = [
  {
    title: 'Personal Identification',
    description:
      'Valid citizenship certificate, passport, or national ID card along with recent passport-sized photographs to confirm your identity.',
  },
  {
    title: 'Address Verification',
    description:
      'Proof of residential address through utility bills, ward recommendation letters, or other accepted address verification documents.',
  },
  {
    title: 'Financial & Business Proof',
    description:
      'Bank statements, income tax returns, and farm income records that demonstrate your repayment capacity and business standing.',
  },
  {
    title: 'Agricultural Documents',
    description:
      'Land ownership or lease papers, crop or livestock details, and any relevant agricultural registration certificates for your farm.',
  },
];
