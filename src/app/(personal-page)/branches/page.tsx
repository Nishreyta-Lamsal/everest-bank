import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import BranchesHeroSection from './_components/BranchesHeroSection';
import MapExplorer from '@/components/shared/map/MapExplorer';

import { getMapLocations } from '@/api/services/location.service';

import { branchLocations } from './_data/branch-locations';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

/**
 * Rebuilt at most once a minute, so a location added in the CMS appears
 * without a deploy while visitors still get a cached page. Without this the
 * page is prerendered once at build time and CMS edits never show.
 */
export const revalidate = 60;

const breadcrumbItems = [{ label: 'Branches' }];

export default async function BranchesPage() {
  // Managed in the CMS. The bundled list is only used if the API is
  // unreachable, so the map still renders during an outage.
  const locations = await getMapLocations('branch', branchLocations);

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <BranchesHeroSection />
      <MapExplorer
        locations={locations}
        searchPlaceholder="Branch name, address"
        resultsLabel="branches found"
      />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
