import StatsHighlightSection from '@/components/shared/stats/StatsHighlightSection';

import { getSectionContent } from '@/lib/get-section-content';

import { depositStats, depositStatsImage } from '../_data/stats';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

type DepositStatsSectionProps = {
  sections?: DepositPageSection[];
};

export default function DepositStatsSection({
  sections,
}: DepositStatsSectionProps) {
  const content = getSectionContent(sections, 'deposit_stats');

  return (
    <StatsHighlightSection
      heading={
        content?.heading ||
        'Trusted by customers for decades, Everest Bank delivers reliable banking solutions for every stage of life.'
      }
      stats={content?.items?.length ? content.items : depositStats}
      image={content?.image?.src || depositStatsImage.src}
      imageAlt={content?.image?.alt || depositStatsImage.alt}
    />
  );
}
