import { icon } from '@/components/icons';

type EligibilityResultSummaryProps = {
  eligibleAmount: number;
  affordableEmi: number;
  maxEmi: number;
};

function formatRupees(value: number, fractionDigits = 0) {
  return `Rs. ${value.toLocaleString('en-IN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}

export default function EligibilityResultSummary({
  eligibleAmount,
  affordableEmi,
  maxEmi,
}: EligibilityResultSummaryProps) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-[12px] bg-red-500 p-5 text-white lg:flex-row lg:items-start lg:justify-between lg:gap-4 lg:p-6">
      <div className="flex flex-col justify-center gap-4 lg:gap-6">
        <div className="flex flex-col gap-3 lg:gap-4">
          <div className="flex items-center gap-2">
            <icon.verifiedTick className="size-[24px] shrink-0" />
            <p className="text-body-2-mobile-md lg:text-body-2-desktop-md">
              You may be eligible for up to
            </p>
          </div>
          <p className="font-heading text-title-0-mobile-md lg:text-heading-h3-desktop-md">
            {formatRupees(eligibleAmount)}
          </p>
        </div>
        <p className="text-body-3-mobile lg:text-body-3-desktop">
          based on a max EMI of {formatRupees(maxEmi)} / month
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3 lg:gap-4">
        <p className="text-body-2-mobile-md lg:text-body-2-desktop-md">
          Affordable EMI
        </p>
        <p className="font-heading text-title-0-mobile-md lg:text-heading-h3-desktop-md">
          {formatRupees(affordableEmi, 2)}
        </p>
      </div>
    </div>
  );
}
