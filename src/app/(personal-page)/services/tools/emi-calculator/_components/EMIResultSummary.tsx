import { Fragment } from 'react';

type EMIResultSummaryProps = {
  monthlyEmi: number;
  months: number;
  principal: number;
  totalInterest: number;
  totalPayable: number;
  principalShare: number;
  interestShare: number;
};

function formatRupees(value: number, fractionDigits = 0) {
  return `Rs. ${value.toLocaleString('en-IN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}

export default function EMIResultSummary({
  monthlyEmi,
  months,
  principal,
  totalInterest,
  totalPayable,
  principalShare,
  interestShare,
}: EMIResultSummaryProps) {
  const totals = [
    { label: 'Principle', value: formatRupees(principal) },
    { label: 'Total Interest', value: formatRupees(totalInterest, 2) },
    { label: 'Total Payable', value: formatRupees(totalPayable, 2) },
  ];

  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      <div className="order-1 flex w-full flex-col gap-6 rounded-[12px] bg-red-500 p-5 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <p className="text-body-2-mobile-md lg:text-body-2-desktop-md">
            Monthly EMI
          </p>
          <p className="text-body-4-mobile lg:text-body-4-desktop">
            over {months} months
          </p>
        </div>
        <p className="font-heading text-title-0-mobile-md lg:text-heading-h3-desktop-md">
          {formatRupees(monthlyEmi)}
        </p>
      </div>

      <div className="order-2 flex w-full flex-col gap-6 lg:order-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        {totals.map((total, index) => (
          <Fragment key={total.label}>
            <div className="flex items-center gap-4 lg:gap-12">
              {index > 0 && (
                <div className="bg-cream-75 hidden h-[48px] w-px lg:block" />
              )}
              <div className="flex flex-col gap-2.5 lg:gap-2">
                <p className="text-body-2-mobile lg:text-body-3-desktop text-grey-300 whitespace-nowrap">
                  {total.label}
                </p>
                <p className="text-body-2-mobile-md lg:text-body-3-desktop-md text-grey-500 whitespace-nowrap">
                  {total.value}
                </p>
              </div>
            </div>
            <div className="bg-cream-75 h-px w-full lg:hidden" />
          </Fragment>
        ))}
      </div>

      <div className="order-3 flex w-full flex-col gap-6 lg:order-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <p className="text-body-2-mobile lg:text-body-3-desktop text-grey-300 flex items-center gap-2.5 whitespace-nowrap">
          Principle Amount
          <span className="text-body-1-mobile-md lg:text-body-2-desktop-md text-orange-500">
            {principalShare.toFixed(2)}%
          </span>
        </p>
        <div className="bg-grey-25 relative h-[30px] w-full shrink-0 lg:w-[150px]">
          <div
            className="h-full bg-orange-500"
            style={{ width: `${principalShare}%` }}
          />
          <div
            className="absolute top-[-5px] h-[40px] w-[4px] bg-orange-500"
            style={{ left: `calc(${principalShare}% - 2px)` }}
          />
        </div>
        <p className="text-body-2-mobile lg:text-body-3-desktop text-grey-300 flex items-center gap-2.5 whitespace-nowrap">
          Interest Amount
          <span className="text-body-1-mobile-md lg:text-body-2-desktop-md text-grey-500">
            {interestShare.toFixed(2)}%
          </span>
        </p>
      </div>

      <div className="bg-cream-75 order-4 h-px w-full lg:hidden" />
    </div>
  );
}
