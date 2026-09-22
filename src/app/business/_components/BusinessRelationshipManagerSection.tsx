import MeetTheTeamSection from '@/components/shared/MeetTheTeamSection';

import { getSectionContent } from '@/lib/get-section-content';

import { relationshipManagers } from '../_data';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

type BusinessRelationshipManagerSectionProps = {
  sections?: BusinessPageSection[];
};

export default function BusinessRelationshipManagerSection({
  sections,
}: BusinessRelationshipManagerSectionProps) {
  const content = getSectionContent(sections, 'business_relationship_managers');

  const heading = content?.heading || 'Meet Your Relationship Manager';
  const description =
    content?.description ||
    'Your business deserves more than banking. Work with a dedicated Relationship Manager who understands your industry, helps you navigate financial decisions, and supports your growth at every stage.';
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'Connect With Our Team';
  const people =
    content?.managers.map((manager) => ({
      name: manager.name,
      role: manager.role,
      image: manager.image?.src || '/placeholder.png',
      alt: manager.image?.alt || manager.name,
    })) || relationshipManagers;

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
