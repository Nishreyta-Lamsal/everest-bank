import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { InvestmentPageSection } from '@/api/services/personal/investment-page.service';

type InvestmentHeroSectionProps = {
  sections?: InvestmentPageSection[];
  title: string;
};

export default function InvestmentHeroSection({
  sections,
  title,
}: InvestmentHeroSectionProps) {
  const content = getSectionContent(sections, 'content_hero');

  return (
    <ContentHeroSection
      image={content?.image?.src || '/placeholder.png'}
      imageAlt={content?.image?.alt || ''}
      heading={content?.heading || title}
      buttonLabel={content?.button?.label || 'Contact your nearest branch'}
      buttonHref={content?.button?.href || ROUTE.BRANCHES}
    />
  );
}
