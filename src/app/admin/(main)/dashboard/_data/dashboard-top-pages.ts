export type TopPage = {
  id: string;
  name: string;
  avgViewTime: string;
  views: string;
  changeLabel: string;
  trend: 'up' | 'down';
};

export const topPages: TopPage[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    avgViewTime: '1m 48s avg',
    views: '512K',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'remittance',
    name: 'Remittance',
    avgViewTime: '1m 48s avg',
    views: '512K',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'atm-branch-locator',
    name: 'ATM / Branch Locator',
    avgViewTime: '1m 48s avg',
    views: '512K',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'business-banking',
    name: 'Business Banking',
    avgViewTime: '1m 48s avg',
    views: '512K',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'about-us',
    name: 'About Us',
    avgViewTime: '1m 48s avg',
    views: '512K',
    changeLabel: '+ 12%',
    trend: 'up',
  },
  {
    id: 'sme-banking',
    name: 'SME Banking',
    avgViewTime: '1m 48s avg',
    views: '512K',
    changeLabel: '+ 12%',
    trend: 'up',
  },
];
