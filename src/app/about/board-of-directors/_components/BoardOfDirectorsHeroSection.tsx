import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutBoardOfDirectorsPageSection } from '@/api/services/about/about-board-of-directors-page.service';

type BoardOfDirectorsHeroSectionProps = {
  sections?: AboutBoardOfDirectorsPageSection[];
};

export default function BoardOfDirectorsHeroSection({
  sections,
}: BoardOfDirectorsHeroSectionProps) {
  const content = getSectionContent(sections, 'content_hero');

  return (
    <ContentHeroSection
      image={content?.image?.src || '/images/about/profile/hero-bg.png'}
      imageAlt={
        content?.image?.alt ||
        'Signage on the exterior of an Everest Bank branch'
      }
      heading={content?.heading || 'Board of Directors'}
      buttonLabel={content?.button?.label || 'Contact Bank'}
      buttonHref={content?.button?.href || ROUTE.BRANCHES}
    />
  );
}
