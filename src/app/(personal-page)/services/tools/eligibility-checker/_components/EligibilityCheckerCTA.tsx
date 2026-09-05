import Link from 'next/link';

import GradientCard from '@/components/ui/cards/GradientCard';
import { PhoneCallIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { ROUTE } from '@/constants';
import { applicationHref } from '../_data/eligibility-checker';

export default function EligibilityCheckerCTA() {
  return (
    <GradientCard className="flex flex-col items-start px-4 py-6 lg:p-10">
      <div className="flex w-full flex-col items-start gap-5 lg:gap-7">
        <h3 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:max-w-[418px]">
          Ready to take the next step?
        </h3>
        <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-500/90 lg:max-w-[546px]">
          Submit your application and our team will confirm your qualifications.
        </p>
        <div className="flex w-full flex-col items-start gap-2 lg:flex-row lg:gap-4">
          <Link href={applicationHref} className="block w-full lg:flex-1">
            <Button
              variant="tertiary-white"
              size="lg"
              className="text-body-4-desktop-md lg:text-body-3-desktop-md h-[36px] w-full lg:h-[46px]"
            >
              Start Your Application
            </Button>
          </Link>
          <Link href={ROUTE.BRANCHES} className="block w-full lg:flex-1">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={
                <PhoneCallIcon className="size-[14px] lg:size-[16px]" />
              }
              className="text-body-4-desktop-md lg:text-body-3-desktop-md h-[36px] w-full text-red-500! lg:h-[46px] lg:text-red-600!"
            >
              Contact Near Branch
            </Button>
          </Link>
        </div>
      </div>
    </GradientCard>
  );
}
