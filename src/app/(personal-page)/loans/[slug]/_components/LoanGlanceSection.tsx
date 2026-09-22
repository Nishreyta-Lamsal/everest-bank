import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { getSectionContent } from '@/lib/get-section-content';

import type { LoanPageSection } from '@/api/services/personal/loan-page.service';

type LoanGlanceSectionProps = {
  sections?: LoanPageSection[];
};

export default function LoanGlanceSection({
  sections,
}: LoanGlanceSectionProps) {
  const content = getSectionContent(sections, 'loan_glance');

  if (!content?.items.length) return null;

  const { items, heading, image, download_href, contact_href } = content;

  return (
    <section className="w-full py-16 lg:pt-15 lg:pb-30">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-10 lg:gap-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[620px]">
            {heading}
          </h2>
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-33">
            <div className="relative order-1 h-[201px] w-full overflow-hidden rounded-lg md:h-[489px] lg:order-2 lg:w-[513px] lg:rounded-3xl lg:rounded-tl-[192px]">
              <Image
                src={image?.src || '/placeholder.png'}
                alt={image?.alt || heading}
                fill
                className="object-cover"
              />
            </div>
            <div className="order-2 flex w-full flex-col items-start gap-10 lg:order-1 lg:w-[620px] lg:gap-12">
              <div className="flex w-full flex-col">
                {items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-[#cedce7] py-4 last:border-b-0"
                  >
                    <p className="font-heading text-title-3-mobile text-grey-500 lg:text-title-2-desktop">
                      {item.label}
                    </p>
                    <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 w-[168px] shrink-0 lg:w-[289px]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col gap-4 lg:hidden">
                <Link href={download_href} className="w-full">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    rightIcon={<icon.arrowUpRight className="size-3.5" />}
                  >
                    Download detailed PDF
                  </Button>
                </Link>
                <Link href={contact_href} className="w-full">
                  <Button variant="secondary" size="sm" className="w-full">
                    Contact nearest bank
                  </Button>
                </Link>
              </div>
              <div className="hidden flex-wrap items-start gap-4 lg:flex">
                <Link href={download_href}>
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={<icon.arrowUpRight />}
                  >
                    Download detailed PDF
                  </Button>
                </Link>
                <Link href={contact_href}>
                  <Button variant="secondary" size="md">
                    Contact nearest bank
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
