import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';
import ImageLinkCard from '@/components/ui/cards/ImageLinkCard';

import type { LoanFinancing } from '../_data';

type LoanFinancingSectionProps = {
  data: LoanFinancing;
};

export default function LoanFinancingSection({
  data,
}: LoanFinancingSectionProps) {
  return (
    <section className="w-full py-16 lg:pt-15 lg:pb-30">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[558px]">
            {data.heading}
          </h2>
          <Link href={data.ctaHref} className="hidden lg:inline-block">
            <Button variant="secondary" size="md">
              {data.ctaLabel}
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
      <div className="scrollbar-hidden mt-10 flex gap-4 overflow-x-auto pl-4 md:pl-8 lg:mt-6 lg:w-full lg:max-w-[1400px] lg:gap-6 lg:overflow-visible lg:px-8 xl:mx-auto">
        {data.cards.map((card) => (
          <ImageLinkCard
            key={card.title}
            href={card.href}
            image={card.image}
            title={card.title}
          />
        ))}
      </div>
      <LayoutWrapper>
        <Link href={data.ctaHref} className="mt-10 block w-full lg:hidden">
          <Button variant="secondary" size="sm" className="w-full">
            {data.ctaLabel}
          </Button>
        </Link>
      </LayoutWrapper>
    </section>
  );
}
