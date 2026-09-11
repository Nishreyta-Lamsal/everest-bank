import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import type { RecommendationRow } from '@/types';

type RecommendationSectionProps = {
  heading: string;
  labelHeading: string;
  valueHeading: string;
  rows: RecommendationRow[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  showPrimaryCtaIcon?: boolean;
  image: string;
  imageAlt: string;
};

export default function RecommendationSection({
  heading,
  labelHeading,
  valueHeading,
  rows,
  primaryCtaLabel,
  secondaryCtaLabel,
  primaryCtaHref = '#',
  secondaryCtaHref = '#',
  showPrimaryCtaIcon = true,
  image,
  imageAlt,
}: RecommendationSectionProps) {
  return (
    <section className="w-full py-16 lg:pt-15 lg:pb-30">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-10 lg:gap-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[620px]">
            {heading}
          </h2>
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-33">
            <div className="order-2 flex w-full flex-col items-start gap-10 lg:order-1 lg:w-[620px] lg:gap-12">
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between gap-4 border-b border-[#cedce7] py-4">
                  <p className="font-heading text-title-3-mobile-md lg:text-title-2-desktop-md text-grey-500">
                    {labelHeading}
                  </p>
                  <p className="font-heading text-title-3-mobile-md lg:text-title-2-desktop-md text-grey-500 w-[168px] shrink-0 lg:w-[289px]">
                    {valueHeading}
                  </p>
                </div>
                {rows.map((row, index) => (
                  <div
                    key={row.label}
                    className={cn(
                      'flex items-center justify-between gap-4 border-b border-[#cedce7] py-4',
                      index === rows.length - 1 && 'border-b-0',
                    )}
                  >
                    <p className="font-heading text-title-3-mobile lg:text-title-2-desktop text-grey-500">
                      {row.label}
                    </p>
                    <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 w-[168px] shrink-0 lg:w-[289px]">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col items-start gap-4 lg:w-auto lg:flex-row lg:flex-wrap">
                <Link href={primaryCtaHref} className="w-full lg:w-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full lg:h-[42px] lg:w-auto"
                    rightIcon={
                      showPrimaryCtaIcon ? (
                        <icon.arrowUpRight className="size-3.5 lg:size-4" />
                      ) : undefined
                    }
                  >
                    {primaryCtaLabel}
                  </Button>
                </Link>
                <Link href={secondaryCtaHref} className="w-full lg:w-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full lg:h-[42px] lg:w-auto"
                  >
                    {secondaryCtaLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative order-1 h-[201px] w-full overflow-hidden rounded-lg md:h-[489px] lg:order-2 lg:w-[513px] lg:rounded-3xl lg:rounded-tl-[192px]">
              <Image src={image} alt={imageAlt} fill className="object-cover" />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
