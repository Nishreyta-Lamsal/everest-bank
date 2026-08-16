import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import LoanApplyChecklistList from './LoanApplyChecklistList';
import Button from '@/components/ui/buttons/Button';

import type { LoanApplyChecklist } from '../../_data';

type LoanApplyChecklistSectionProps = {
  data: LoanApplyChecklist;
};

export default function LoanApplyChecklistSection({
  data,
}: LoanApplyChecklistSectionProps) {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-12">
          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[500px]">
              {data.heading}
            </h2>
            <Link href={data.applyHref} className="hidden lg:inline-block">
              <Button variant="secondary" size="md">
                Apply for the loan
              </Button>
            </Link>
          </div>

          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="relative order-1 h-[239px] w-full overflow-hidden rounded-lg md:h-[489px] lg:order-2 lg:h-[526px] lg:w-[513px] lg:rounded-3xl lg:rounded-tl-[192px]">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="order-2 w-full lg:order-1 lg:w-[566px]">
              <LoanApplyChecklistList items={data.items} />
            </div>
          </div>

          <Link href={data.applyHref} className="lg:hidden">
            <Button variant="secondary" size="sm">
              Apply for the loan
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
    </section>
  );
}
