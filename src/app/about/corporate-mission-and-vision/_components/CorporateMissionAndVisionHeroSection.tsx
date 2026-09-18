import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutCorporateMissionAndVisionPageSection } from '@/api/services/about/about-corporate-mission-and-vision-page.service';

type CorporateMissionAndVisionHeroSectionProps = {
  sections?: AboutCorporateMissionAndVisionPageSection[];
};

export default function CorporateMissionAndVisionHeroSection({
  sections,
}: CorporateMissionAndVisionHeroSectionProps) {
  const content = getSectionContent(sections, 'content_hero');

  return (
    <ContentHeroSection
      image={content?.image?.src || '/images/about/profile/hero-bg.png'}
      imageAlt={
        content?.image?.alt ||
        'Signage on the exterior of an Everest Bank branch'
      }
      heading={content?.heading || 'Corporate Mission & Vision'}
      buttonLabel={content?.button?.label || 'Contact Near Branch'}
      buttonHref={content?.button?.href || ROUTE.BRANCHES}
    />
  );
}
