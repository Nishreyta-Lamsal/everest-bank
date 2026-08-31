type FDResultSummaryProps = {
  maturityValue: number;
  principal: number;
  interestEarned: number;
  tenureLabel: string;
  compoundingLabel: string;
};

function formatRupees(value: number) {
  return `Rs. ${Math.round(value).toLocaleString('en-IN')}`;
}

export default function FDResultSummary({
  maturityValue,
  principal,
  interestEarned,
  tenureLabel,
  compoundingLabel,
}: FDResultSummaryProps) {
  const investedShare =
    maturityValue > 0 ? (principal / maturityValue) * 100 : 0;

  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      <div className="flex w-full flex-col gap-6 rounded-[12px] bg-red-500 p-5 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-6">
        <div className="flex flex-col gap-1">
          <p className="text-body-2-mobile-md lg:text-body-2-desktop-md">
            Maturity Value
          </p>
          <p className="text-body-4-mobile lg:text-body-4-desktop">
            after {tenureLabel} (Compounding {compoundingLabel})
          </p>
        </div>
        <p className="font-heading text-title-0-mobile-md lg:text-heading-h3-desktop-md">
          {formatRupees(maturityValue)}
        </p>
      </div>

      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <p className="text-body-2-mobile lg:text-body-3-desktop text-grey-300 flex items-center gap-2 whitespace-nowrap">
          Amount Invested
          <span className="text-body-1-mobile-md lg:text-body-2-desktop-md text-orange-500">
            {formatRupees(principal)}
          </span>
        </p>
        <div className="relative h-[30px] w-full shrink-0 bg-green-500 lg:w-[155px]">
          <div
            className="h-full bg-orange-500"
            style={{ width: `${investedShare}%` }}
          />
          <div className="absolute top-[-5px] right-0 h-[40px] w-[4px] bg-green-500" />
        </div>
        <p className="text-body-2-mobile lg:text-body-3-desktop text-grey-300 flex items-center gap-2 whitespace-nowrap">
          Interest Earned
          <span className="text-body-1-mobile-md lg:text-body-2-desktop-md text-grey-500">
            {formatRupees(interestEarned)}
          </span>
        </p>
      </div>
    </div>
  );
}
