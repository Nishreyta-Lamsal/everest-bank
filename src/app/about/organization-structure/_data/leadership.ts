export type LeadershipMember = {
  name: string;
  departments: string;
  role: string;
};

export const executiveLeadership: LeadershipMember[] = [
  {
    name: 'Mr. Yogendra Singh Udawat',
    departments: 'HR · Treasury · Compliance · Finance',
    role: 'Dy. Chief Executive Officer',
  },
  {
    name: 'Mr. Siddharath Rana',
    departments: 'Digital Banking · Operations',
    role: 'Dy. General Manager',
  },
  {
    name: 'Mr. Ashutosh Sharma',
    departments: 'Corporate Credit · Legal · Share/DP',
    role: 'Dy. General Manager',
  },
  {
    name: 'Mr. Bishnu Prasad Gnawali',
    departments: 'Retail / SME Credit',
    role: 'Asst. General Manager',
  },
  {
    name: 'Mr. Santosh Bhattarai',
    departments: 'Credit Risk · Recovery · NPA',
    role: 'Asst. General Manager',
  },
];

export type ChiefOfficer = {
  name: string;
  role: string;
};

export const chiefOfficers: ChiefOfficer[] = [
  { name: 'Mr. Rajan Kayastha', role: 'Chief Finance Officer (CFO)' },
  { name: 'Mr. Kiran Mahat', role: 'Chief Operating Officer (COO)' },
  { name: 'Mr. Raju Gauli', role: 'Chief Risk Officer (CRO)' },
];
