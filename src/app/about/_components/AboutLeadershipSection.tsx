import MeetTheTeamSection from '@/components/shared/MeetTheTeamSection';

import { aboutLeaders } from '../_data';

export default function AboutLeadershipSection() {
  return (
    <MeetTheTeamSection
      heading="Leadership Driving Sustainable Growth"
      description="Meet the experienced leaders shaping Everest Bank’s future through innovation, governance, and customer commitment."
      ctaLabel="Meet Our Leadership Team"
      ctaHref="#"
      people={aboutLeaders}
    />
  );
}
