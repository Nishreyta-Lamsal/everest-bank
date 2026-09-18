import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AtmHeroSection from './_components/AtmHeroSection';
import MapExplorer from '@/components/shared/map/MapExplorer';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { getMapLocations } from '@/api/services/location.service';

import { atmLocations } from './_data/atm-locations';

/**
 * Rebuilt at most once a minute, so a location added in the CMS appears
 * without a deploy while visitors still get a cached page. Without this the
 * page is prerendered once at build time and CMS edits never show.
 */
export const revalidate = 60;

const breadcrumbItems = [{ label: 'ATM' }];

export default async function AtmPage() {
  // Managed in the CMS. The bundled list is only used if the API is
  // unreachable, so the map still renders during an outage.
  const locations = await getMapLocations('atm', atmLocations);

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <AtmHeroSection />
      <MapExplorer
        locations={locations}
        searchPlaceholder="ATM name, address"
        resultsLabel="ATMs found"
      />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
