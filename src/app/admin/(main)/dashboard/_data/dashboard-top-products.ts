export type TopProduct = {
  id: string;
  name: string;
  type: string;
  views: string;
  applications: string;
  changeLabel: string;
  trend: 'up' | 'down';
};

export const topProducts: TopProduct[] = [
  {
    id: 'everest-home-loan',
    name: 'Everest Home Loan',
    type: 'Loan',
    views: '48.2K',
    applications: '312',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'everest-remit',
    name: 'Everest Remit',
    type: 'Remittance',
    views: '48.2K',
    applications: '-',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'everest-agriculture-loan',
    name: 'Everest Agriculture Loan',
    type: 'Loan',
    views: '48.2K',
    applications: '208',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'everest-fixed-deposite',
    name: 'Everest Fixed Deposite',
    type: 'Account',
    views: '48.2K',
    applications: '176',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'everest-auto-loan',
    name: 'Everest Auto Loan',
    type: 'Loan',
    views: '48.2K',
    applications: '142',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'everest-visa-credit-card',
    name: 'Everest Visa Credit Card',
    type: 'Loan',
    views: '48.2K',
    applications: '98',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'sunaulo-bhavishya-savings',
    name: 'Sunaulo Bhavishya Savings',
    type: 'Account',
    views: '48.2K',
    applications: '134',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'everest-personal-loan',
    name: 'Everest Personal Loan',
    type: 'Loan',
    views: '48.2K',
    applications: '87',
    changeLabel: '- 3%',
    trend: 'down',
  },
];
