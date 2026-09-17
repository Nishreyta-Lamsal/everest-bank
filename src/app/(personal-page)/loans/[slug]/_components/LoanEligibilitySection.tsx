import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';
import SelectField from '@/components/ui/inputs/SelectField';
import TextField from '@/components/ui/inputs/TextField';

import { getSectionContent } from '@/lib/get-section-content';

import { loanTypeOptions } from '../_data';

import type { LoanPageSection } from '@/api/services/personal/loan-page.service';

type LoanEligibilitySectionProps = {
  sections?: LoanPageSection[];
};

export default function LoanEligibilitySection({
  sections,
}: LoanEligibilitySectionProps) {
  const content = getSectionContent(sections, 'loan_eligibility');

  if (!content) return null;

  const { heading, applicant_types, requirements_href } = content;

  return (
    <section className="w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between xl:gap-16">
          <div className="flex flex-col items-start gap-10 lg:gap-12 lg:py-8">
            <div className="flex flex-col gap-10 lg:gap-12">
              <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[528px]">
                {heading}
              </h2>
              <ul className="flex flex-col items-start gap-4">
                {applicant_types.map((type) => (
                  <li key={type} className="flex items-center gap-2">
                    <icon.circleCheck className="text-grey-400 size-[20px] lg:size-[24px]" />
                    <span className="font-heading text-title-3-mobile lg:text-title-0-desktop text-grey-400">
                      {type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={requirements_href}
              className="block w-full lg:inline-block lg:w-auto"
            >
              <Button
                variant="secondary"
                size="md"
                className="h-9 w-full lg:h-[42px] lg:w-auto"
              >
                See detailed requirement
              </Button>
            </Link>
          </div>

          <div className="bg-grey-bluish-grey flex w-full flex-col gap-8 rounded-2xl p-4 lg:w-[513px] lg:p-8">
            <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h3-desktop-md text-grey-500">
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
                  <icon.percent className="text-grey-300 size-[14px] shrink-0" />
                }
              />
              <div className="flex items-center gap-6 lg:gap-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="text-body-4-desktop-md lg:text-body-3-desktop-md h-9 w-[219px] px-6 lg:h-[46px] lg:w-auto lg:flex-1"
                >
                  Calculate
                </Button>
                <button
                  type="button"
                  className="text-body-4-desktop-md text-grey-400 inline-flex shrink-0 items-center gap-1"
                >
                  <icon.reset className="size-[16px]" />
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
