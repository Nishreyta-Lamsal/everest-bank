export type StatHighlight = {
  id: string;
  label: string;
  changeLabel: string;
  value: string;
  accentColor: string;
};

export const statHighlights: StatHighlight[] = [
  {
    id: 'published-today',
    label: 'Published today',
    changeLabel: '+ 12%',
    value: '18.4k',
    accentColor: '#2694A1',
  },
  {
    id: 'loan-applications',
    label: 'Loan applications',
    changeLabel: '+ 8%',
    value: '342',
    accentColor: '#F59D2A',
  },
  {
    id: 'new-accounts',
    label: 'New accounts (7d)',
    changeLabel: '+ 15%',
    value: '1.2k',
    accentColor: '#0986FF',
  },
];
