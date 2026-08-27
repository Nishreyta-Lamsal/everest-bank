import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutHeroSectionProps = {
  sections?: AboutPageSection[];
};

export default function AboutHeroSection({ sections }: AboutHeroSectionProps) {
  const content = getSectionContent(sections, 'about_hero');

  return (
    <ContentHeroSection
      image={content?.image?.src || '/images/about/about-hero-bg.png'}
      imageAlt={
        content?.image?.alt ||
        'A family sitting together on the floor of their living room'
      }
      heading={content?.heading || 'More Than Banking, A Partner in Progress.'}
      buttonLabel={content?.button?.label || 'Apply for your card'}
      buttonHref={content?.button?.href || '#'}
    />
  );
}
