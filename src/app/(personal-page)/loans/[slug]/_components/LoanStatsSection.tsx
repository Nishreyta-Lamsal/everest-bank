import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { getSectionContent } from '@/lib/get-section-content';

import type { LoanPageSection } from '@/api/services/personal/loan-page.service';

type LoanStatsSectionProps = {
  sections?: LoanPageSection[];
};

export default function LoanStatsSection({ sections }: LoanStatsSectionProps) {
  const content = getSectionContent(sections, 'loan_stats');
  const stats = content?.items ?? [];

  if (!stats.length) return null;

  return (
    <section className="w-full py-8 lg:py-12">
      <LayoutWrapper>
        <div className="grid grid-cols-2 gap-x-6.5 gap-y-6 lg:flex lg:items-start lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-4 lg:w-[298px] lg:gap-6"
            >
              <p className="font-heading text-title-1-mobile-md lg:text-heading-h3-desktop-md text-red-500">
                {stat.value}
              </p>
              <p className="font-heading text-title-3-mobile lg:text-title-1-desktop text-grey-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
