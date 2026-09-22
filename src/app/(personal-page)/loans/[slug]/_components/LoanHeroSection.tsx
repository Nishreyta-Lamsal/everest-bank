import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { getSectionContent } from '@/lib/get-section-content';

import type { LoanPageSection } from '@/api/services/personal/loan-page.service';

type LoanHeroSectionProps = {
  sections?: LoanPageSection[];
};

export default function LoanHeroSection({ sections }: LoanHeroSectionProps) {
  const content = getSectionContent(sections, 'loan_hero');

  if (!content) return null;

  const { title, description, image, primary_cta, secondary_cta } = content;

  return (
    <section className="relative h-[312px] w-full overflow-hidden bg-[#d9d9d9] lg:h-[528px] lg:bg-[#fff5ed]">
      <Image
        src={image?.src || '/placeholder.png'}
        alt={image?.alt || title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(83.98deg,rgba(0,0,0,0.7)_4.208%,rgba(0,0,0,0)_96.099%)] lg:bg-[linear-gradient(76.81deg,rgba(0,0,0,0.7)_20.679%,rgba(0,0,0,0)_70.847%)]" />

      <div className="absolute inset-x-0 top-[181px] z-10 lg:top-[278px]">
        <LayoutWrapper>
          <div className="flex max-w-[260px] flex-col items-start gap-4 lg:max-w-[713px] lg:gap-8">
            <h1 className="font-heading text-display-1-mobile-md lg:text-display-1-desktop-md text-white">
              {title}
            </h1>
            <div className="flex flex-col items-start gap-4">
              <p className="lg:text-body-2-desktop hidden text-white/90 lg:block lg:w-[646px]">
                {description}
              </p>
              <div className="flex items-start gap-2 lg:hidden">
                <Link href={primary_cta.href}>
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<icon.arrowUpRight className="size-3.5" />}
                  >
                    {primary_cta.label}
                  </Button>
                </Link>
                <Link href={secondary_cta.href}>
                  <Button variant="tertiary-white" size="sm">
                    {secondary_cta.label}
                  </Button>
                </Link>
              </div>
              <div className="hidden items-start gap-4 lg:flex">
                <Link href={primary_cta.href}>
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<icon.arrowUpRight />}
                  >
                    {primary_cta.label}
                  </Button>
                </Link>
                <Link href={secondary_cta.href}>
                  <Button variant="tertiary-white" size="lg">
                    {secondary_cta.label}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
