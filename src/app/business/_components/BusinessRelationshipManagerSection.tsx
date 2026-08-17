import MeetTheTeamSection from '@/components/shared/MeetTheTeamSection';

import { relationshipManagers } from '../_data';

export default function BusinessRelationshipManagerSection() {
  return (
    <MeetTheTeamSection
      heading="Meet Your Relationship Manager"
      description="Your business deserves more than banking. Work with a dedicated Relationship Manager who understands your industry, helps you navigate financial decisions, and supports your growth at every stage."
      ctaLabel="Connect With Our Team"
      ctaHref="#"
      people={relationshipManagers}
    />
  );
}
