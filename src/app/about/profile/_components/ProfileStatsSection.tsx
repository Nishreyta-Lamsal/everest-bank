import ContentStatsSection from '@/components/shared/content/ContentStatsSection';

import { profileStats } from '../_data/stats';

export default function ProfileStatsSection() {
  return <ContentStatsSection stats={profileStats} />;
}
