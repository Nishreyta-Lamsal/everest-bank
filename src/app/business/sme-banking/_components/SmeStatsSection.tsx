import StatsHighlightSection from '@/components/shared/stats/StatsHighlightSection';

import { getSectionContent } from '@/lib/get-section-content';

import { smeStats, smeStatsImage } from '../_data/stats';

import type { SmePageSection } from '@/api/services/business/sme-page.service';

type SmeStatsSectionProps = {
  sections?: SmePageSection[];
};

export default function SmeStatsSection({ sections }: SmeStatsSectionProps) {
  const content = getSectionContent(sections, 'sme_stats');

  return (
    <StatsHighlightSection
      heading={
        content?.heading ||
        'Supporting Nepal’s businesses with tailored financial solutions and dedicated relationship managers.'
      }
      stats={content?.items?.length ? content.items : smeStats}
      image={content?.image?.src || smeStatsImage.src}
      imageAlt={content?.image?.alt || smeStatsImage.alt}
    />
  );
}
