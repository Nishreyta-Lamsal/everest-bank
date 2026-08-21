import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { financingImage, financingRows } from '../_data/financing';

export default function SMEFinancingSection() {
  return (
    <section className="w-full py-16 lg:pt-15 lg:pb-30">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-10 lg:gap-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[620px]">
            Find the Right Financing
          </h2>
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-33">
            <div className="order-2 flex w-full flex-col items-start gap-10 lg:order-1 lg:w-[620px] lg:gap-12">
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between gap-4 border-b border-[#cedce7] py-4">
                  <p className="font-heading text-title-3-mobile-md lg:text-title-2-desktop-md text-grey-500">
                    Business Stage
                  </p>
                  <p className="font-heading text-title-3-mobile-md lg:text-title-2-desktop-md text-grey-500 w-[168px] shrink-0 lg:w-[289px]">
                    Recommended Solution
                  </p>
                </div>
                {financingRows.map((row, index) => (
                  <div
                    key={row.stage}
                    className={cn(
                      'flex items-center justify-between gap-4 border-b border-[#cedce7] py-4',
                      index === financingRows.length - 1 && 'border-b-0',
                    )}
                  >
                    <p className="font-heading text-title-3-mobile lg:text-title-2-desktop text-grey-500">
                      {row.stage}
                    </p>
                    <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 w-[168px] shrink-0 lg:w-[289px]">
                      {row.solution}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col items-start gap-4 lg:w-auto lg:flex-row lg:flex-wrap">
                <Link href="#" className="w-full lg:w-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full lg:h-[42px] lg:w-auto"
                    rightIcon={
                      <ArrowUpRightIcon className="size-3.5 lg:size-4" />
                    }
                  >
                    Open Business Account
                  </Button>
                </Link>
                <Link href="#" className="w-full lg:w-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full lg:h-[42px] lg:w-auto"
                  >
                    Talk to an Expert
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative order-1 h-[201px] w-full overflow-hidden rounded-lg md:h-[489px] lg:order-2 lg:w-[513px] lg:rounded-3xl lg:rounded-tl-[192px]">
              <Image
                src={financingImage.src}
                alt={financingImage.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
