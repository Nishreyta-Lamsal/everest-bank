import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import type { SmePageSection } from '@/api/services/business/sme-page.service';

type SmeHeroSectionProps = {
  sections?: SmePageSection[];
};

export default function SmeHeroSection({ sections }: SmeHeroSectionProps) {
  const content = getSectionContent(sections, 'sme_hero');

  return (
    <ContentHeroSection
      image={content?.image?.src || '/images/business/sme-banking-hero.png'}
      imageAlt={
        content?.image?.alt ||
        'A potter shaping clay pots, representing a small business Everest Bank supports'
      }
      heading={content?.heading || 'SME Banking'}
      buttonLabel={content?.button?.label || 'Open a Business Account'}
      buttonHref={content?.button?.href || '#'}
      secondaryButtonHref={content?.secondary_button?.href || '#'}
    />
  );
}
