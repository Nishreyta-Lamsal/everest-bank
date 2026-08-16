import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { CircleCheckIcon, PercentIcon, ResetIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';
import SelectField from '@/components/ui/inputs/SelectField';
import TextField from '@/components/ui/inputs/TextField';

import { loanTypeOptions } from '../_data';

import type { LoanEligibility } from '../_data';

type LoanEligibilitySectionProps = {
  data: LoanEligibility;
};

export default function LoanEligibilitySection({
  data,
}: LoanEligibilitySectionProps) {
  return (
    <section className="w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between xl:gap-16">
          <div className="flex flex-col items-start gap-10 lg:gap-12 lg:py-8">
            <div className="flex flex-col gap-10 lg:gap-12">
              <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[528px]">
                {data.heading}
              </h2>
              <ul className="flex flex-col items-start gap-4">
                {data.applicantTypes.map((type) => (
                  <li key={type} className="flex items-center gap-2">
                    <CircleCheckIcon className="text-grey-400 size-[20px] lg:size-[24px]" />
                    <span className="font-heading text-title-3-mobile lg:text-title-0-desktop text-grey-400">
                      {type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={data.requirementsHref}>
              <Button variant="secondary" size="md">
                See detailed requirement
              </Button>
            </Link>
          </div>

          <div className="bg-grey-bluish-grey flex w-full flex-col gap-8 rounded-2xl p-4 lg:w-[513px] lg:p-8">
            <h3 className="font-heading text-title-0-mobile-md lg:text-heading-h3-desktop-md text-grey-500">
              Borrowing power calculator
            </h3>
            <div className="flex flex-col gap-5 lg:gap-6">
              <SelectField
                label="Loan Type"
                options={loanTypeOptions}
                defaultValue={loanTypeOptions[0]?.value}
              />
              <TextField label="Gross Monthly Income" placeholder="Rs." />
              <TextField
                label="Interest Rate"
                placeholder="0"
                trailingIcon={
                  <PercentIcon className="text-grey-300 size-[14px] shrink-0" />
                }
              />
              <div className="flex items-center gap-6 lg:gap-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="text-body-4-desktop-md lg:text-body-3-desktop-md h-9 px-6 lg:h-[46px] lg:flex-1"
                >
                  Calculate
                </Button>
                <button
                  type="button"
                  className="text-body-4-desktop-md text-grey-400 inline-flex shrink-0 items-center gap-1"
                >
                  <ResetIcon className="size-[16px]" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
