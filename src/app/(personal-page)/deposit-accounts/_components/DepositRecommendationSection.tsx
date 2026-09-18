import RecommendationSection from '@/components/shared/recommendation/RecommendationSection';

import { getSectionContent } from '@/lib/get-section-content';

import { idealAccountImage, idealAccountRows } from '../_data/ideal-account';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

type DepositRecommendationSectionProps = {
  sections?: DepositPageSection[];
};

export default function DepositRecommendationSection({
  sections,
}: DepositRecommendationSectionProps) {
  const content = getSectionContent(sections, 'deposit_recommendation');

  return (
    <RecommendationSection
      heading={content?.heading || 'Find Your Ideal Account'}
      labelHeading={content?.label_heading || 'Need'}
      valueHeading={content?.value_heading || 'Recommended Account'}
      rows={content?.rows?.length ? content.rows : idealAccountRows}
      primaryCtaLabel={
        content?.primary_cta?.label || 'Open Your Account in 3 Minutes'
      }
      primaryCtaHref={content?.primary_cta?.href}
      secondaryCtaLabel={
        content?.secondary_cta?.label || 'Talk to the nearest bank'
      }
      secondaryCtaHref={content?.secondary_cta?.href}
      image={content?.image?.src || idealAccountImage.src}
      imageAlt={content?.image?.alt || idealAccountImage.alt}
    />
  );
}
