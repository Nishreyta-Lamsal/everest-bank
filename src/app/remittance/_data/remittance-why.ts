export type RemittanceStat = {
  value: string;
  label: string;
};

export const remittanceWhyStats: RemittanceStat[] = [
  {
    value: '30+',
    label: 'Years of Trusted Service',
  },
  {
    value: '9,000+',
    label: 'Payout Agents Nationwide',
  },
];

export const remittanceWhyImage = {
  src: '/images/remittance/why-send-money.png',
  alt: 'A woman placing a coin into a jar labeled savings',
};
