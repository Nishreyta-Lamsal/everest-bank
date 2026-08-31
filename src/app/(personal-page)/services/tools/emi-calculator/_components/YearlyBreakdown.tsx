import YearlyBreakdownItem from './YearlyBreakdownItem';

import { yearlyBreakdownYears } from '../_data/emi-calculator';

export default function YearlyBreakdown() {
  return (
    <div className="flex w-full flex-col items-start gap-3 lg:gap-6">
      <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
        Yearly Breakdown
      </h3>
      <div className="flex w-full flex-col items-start">
        {yearlyBreakdownYears.map((year) => (
          <YearlyBreakdownItem key={year} year={year} />
        ))}
      </div>
    </div>
  );
}
