import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FinancingContentCard from './FinancingContentCard';
import FinancingMediaCard from './FinancingMediaCard';
import Button from '@/components/ui/buttons/Button';

import {
  businessFinancingContentCards,
  businessFinancingMediaCard,
} from '../../_data';

export default function BusinessFinancingSection() {
  const [workingCapitalCard, tradeFinanceCard] = businessFinancingContentCards;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 xl:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h2-desktop-md lg:w-122.5">
            Financing built to support every stage of growth.
          </h2>
          <Link href="#" className="hidden lg:inline-block lg:w-auto">
            <Button variant="secondary" size="lg">
              Explore financing solutions
            </Button>
          </Link>
        </div>
        <div className="mt-10 flex w-full flex-col items-stretch gap-6 lg:flex-row xl:mt-12 xl:gap-10">
          <FinancingContentCard {...workingCapitalCard} />
          <FinancingMediaCard {...businessFinancingMediaCard} />
          <FinancingContentCard {...tradeFinanceCard} />
        </div>
        <Link href="#" className="mt-10 block w-full lg:hidden">
          <Button variant="secondary" size="sm" className="w-full">
            Explore financing solutions
          </Button>
        </Link>
      </LayoutWrapper>
    </section>
  );
}
