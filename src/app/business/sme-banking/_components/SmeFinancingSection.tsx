import RecommendationSection from '@/components/shared/recommendation/RecommendationSection';

import { getSectionContent } from '@/lib/get-section-content';

import { financingImage, financingRows } from '../_data/financing';

import type { SmePageSection } from '@/api/services/business/sme-page.service';
import type { RecommendationRow } from '@/types';

type SmeFinancingSectionProps = {
  sections?: SmePageSection[];
};

export default function SmeFinancingSection({
  sections,
}: SmeFinancingSectionProps) {
  const content = getSectionContent(sections, 'sme_financing');

  const rows: RecommendationRow[] = content?.rows?.length
    ? content.rows.map((row) => ({ label: row.stage, value: row.solution }))
    : financingRows;

  return (
    <RecommendationSection
      heading={content?.heading || 'Find the Right Financing'}
      labelHeading={content?.stage_heading || 'Business Stage'}
      valueHeading={content?.solution_heading || 'Recommended Solution'}
      rows={rows}
      primaryCtaLabel={content?.primary_cta?.label || 'Open Business Account'}
      primaryCtaHref={content?.primary_cta?.href}
      secondaryCtaLabel={content?.secondary_cta?.label || 'Talk to an Expert'}
      secondaryCtaHref={content?.secondary_cta?.href}
      image={content?.image?.src || financingImage.src}
      imageAlt={content?.image?.alt || financingImage.alt}
    />
  );
}
