import ContentHeroSection from '@/components/shared/content/ContentHeroSection';

import { getSectionContent } from '@/lib/get-section-content';

import { ROUTE } from '@/constants';

import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';

type ProfileHeroSectionProps = {
  sections?: AboutProfilePageSection[];
};

export default function ProfileHeroSection({
  sections,
}: ProfileHeroSectionProps) {
  const content = getSectionContent(sections, 'content_hero');

  return (
    <ContentHeroSection
      image={content?.image?.src || '/images/about/profile/hero-bg.png'}
      imageAlt={
        content?.image?.alt ||
        'Signage on the exterior of an Everest Bank branch'
      }
      heading={content?.heading || 'Profile'}
      buttonLabel={content?.button?.label || 'Contact Near Branch'}
      buttonHref={content?.button?.href || ROUTE.BRANCHES}
    />
  );
}
