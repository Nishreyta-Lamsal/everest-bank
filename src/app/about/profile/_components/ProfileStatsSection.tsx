import ContentStatsSection from '@/components/shared/ContentStatsSection';

import { profileStats } from '../_data/stats';

export default function ProfileStatsSection() {
  return <ContentStatsSection stats={profileStats} />;
}
