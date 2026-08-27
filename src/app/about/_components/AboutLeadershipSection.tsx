import MeetTheTeamSection from '@/components/shared/MeetTheTeamSection';

import { getSectionContent } from '@/lib/get-section-content';

import { aboutLeaders } from '../_data';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutLeadershipSectionProps = {
  sections?: AboutPageSection[];
};

export default function AboutLeadershipSection({
  sections,
}: AboutLeadershipSectionProps) {
  const content = getSectionContent(sections, 'about_leadership');

  const heading = content?.heading || 'Leadership Driving Sustainable Growth';
  const description =
    content?.description ||
    'Meet the experienced leaders shaping Everest Bank’s future through innovation, governance, and customer commitment.';
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'Meet Our Leadership Team';
  const people =
    content?.people.map((person) => ({
      name: person.name,
      role: person.role,
      image: person.image.src,
      alt: person.image.alt,
    })) || aboutLeaders;

  return (
    <MeetTheTeamSection
      heading={heading}
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      people={people}
    />
  );
}
