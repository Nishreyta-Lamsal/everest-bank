import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

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
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[558px]">
            {data.heading}
          </h2>
          <Link href={data.ctaHref} className="hidden lg:inline-block">
            <Button variant="secondary" size="md">
              {data.ctaLabel}
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
      <div className="scrollbar-hidden mt-8 flex gap-4 overflow-x-auto pl-4 md:pl-8 lg:mt-6 lg:w-full lg:max-w-[1400px] lg:gap-6 lg:overflow-visible lg:px-8 xl:mx-auto">
        {data.cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative h-[201px] w-[308px] shrink-0 overflow-hidden rounded-lg lg:h-[324px] lg:w-auto lg:flex-1"
          >
            <Image
              src={card.image}
              alt={card.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.68)]" />
            <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between lg:right-6 lg:bottom-6 lg:left-6">
              <p className="font-heading text-heading-h3-mobile lg:text-heading-h3-desktop text-white">
                {card.title}
              </p>
              <ArrowUpRightIcon className="size-[20px] shrink-0 text-white lg:size-[32px]" />
            </div>
          </Link>
        ))}
      </div>
      <LayoutWrapper>
        <Link href={data.ctaHref} className="mt-8 block w-full lg:hidden">
          <Button variant="secondary" size="sm" className="w-full">
            {data.ctaLabel}
          </Button>
        </Link>
      </LayoutWrapper>
    </section>
  );
}
