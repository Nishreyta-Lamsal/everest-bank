import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import BranchesHeroSection from './_components/BranchesHeroSection';
import MapFilterBar from '@/components/shared/map/MapFilterBar';
import MapSection from '@/components/shared/map/MapSection';

import { branchLocations } from './_data/branch-locations';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

const breadcrumbItems = [{ label: 'Branches' }];

export default function BranchesPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <BranchesHeroSection />
      <MapFilterBar searchPlaceholder="Branch name, address" />
      <MapSection locations={branchLocations} resultsLabel="branches found" />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
