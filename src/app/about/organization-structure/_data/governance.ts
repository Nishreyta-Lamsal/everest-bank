export type CommitteeItem = {
  name: string;
  abbreviation: string;
};

export const boardCommittees: CommitteeItem[] = [
  { name: 'Audit Committee of Board', abbreviation: 'ACB' },
  { name: 'Risk Management Committee', abbreviation: 'RMC' },
  { name: 'Human Resource Management Committee', abbreviation: 'HRMC' },
  { name: 'Assets Laundering Prevention Committee', abbreviation: 'ALPC' },
  { name: 'Assets Liability Committee', abbreviation: 'ALCO' },
];
