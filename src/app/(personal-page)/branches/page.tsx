import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import BranchesHeroSection from './_components/BranchesHeroSection';
import MapExplorer from '@/components/shared/map/MapExplorer';

import { branchLocations } from './_data/branch-locations';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

const breadcrumbItems = [{ label: 'Branches' }];

export default function BranchesPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <BranchesHeroSection />
      <MapExplorer
        locations={branchLocations}
        searchPlaceholder="Branch name, address"
        resultsLabel="branches found"
      />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
