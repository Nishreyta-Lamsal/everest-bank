import ContentStatsSection from '@/components/shared/content/ContentStatsSection';

import { getSectionContent } from '@/lib/get-section-content';

import { corporateMissionAndVisionStats } from '../_data/stats';

import type { AboutCorporateMissionAndVisionPageSection } from '@/api/services/about/about-corporate-mission-and-vision-page.service';

type CorporateMissionAndVisionStatsSectionProps = {
  sections?: AboutCorporateMissionAndVisionPageSection[];
};

export default function CorporateMissionAndVisionStatsSection({
  sections,
}: CorporateMissionAndVisionStatsSectionProps) {
  const content = getSectionContent(sections, 'content_stats');

  const apiStats =
    content?.stats?.filter(
      (stat) => Boolean(stat?.value) && Boolean(stat?.label),
    ) ?? [];

  const stats = apiStats.length ? apiStats : corporateMissionAndVisionStats;

  return <ContentStatsSection stats={stats} />;
}
