import ContentStatsSection from '@/components/shared/content/ContentStatsSection';

import { getSectionContent } from '@/lib/get-section-content';

import { profileStats } from '../_data/stats';

import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';

type ProfileStatsSectionProps = {
  sections?: AboutProfilePageSection[];
};

export default function ProfileStatsSection({
  sections,
}: ProfileStatsSectionProps) {
  const content = getSectionContent(sections, 'content_stats');

  // A stat without both a value and a label renders as a blank column,
  // so incomplete entries are dropped rather than shown.
  const apiStats =
    content?.stats?.filter(
      (stat) => Boolean(stat?.value) && Boolean(stat?.label),
    ) ?? [];

  const stats = apiStats.length ? apiStats : profileStats;

  return <ContentStatsSection stats={stats} />;
}
