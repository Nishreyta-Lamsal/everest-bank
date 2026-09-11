export type WebsiteVisitsDayGroup = {
  day: string;
  bars: number[];
  highlighted?: boolean;
};

export const websiteVisitsChartHeight = 200;

export const websiteVisitsPeakLabel = '144k';

export const websiteVisitsAxisLabels = ['144k', '138k', '130k', '124k'];

export const websiteVisitsChartData: WebsiteVisitsDayGroup[] = [
  { day: 'Mon', bars: [88, 88, 88, 88, 88, 88, 66, 66, 66] },
  { day: 'Tue', bars: [148, 148, 148, 148, 148, 148, 148, 66, 66, 66, 66] },
  { day: 'Wed', bars: [110, 110, 110, 110, 110, 110, 110, 110] },
  {
    day: 'Thu',
    bars: [124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124, 124],
  },
  {
    day: 'Fri',
    bars: [200, 200, 200, 200, 200, 200, 200, 200],
    highlighted: true,
  },
  { day: 'Sat', bars: [70, 70, 70, 70, 70, 70, 70] },
  { day: 'Sun', bars: [178, 178, 178, 178, 178, 178] },
];

export const websiteVisitsStats = {
  title: 'Website visits',
  period: 'Last 7 days',
  total: '1.24M',
  changeLabel: '18% vs Last Week',
};
