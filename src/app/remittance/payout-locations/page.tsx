import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import MapExplorer from '@/components/shared/map/MapExplorer';

import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { getMapLocations } from '@/api/services/location.service';

import { ROUTE } from '@/constants';
import { payoutLocations } from './_data/payout-locations';

/**
 * Rebuilt at most once a minute, so a location added in the CMS appears
 * without a deploy while visitors still get a cached page.
 */
export const revalidate = 60;

const breadcrumbItems = [
  { label: 'Remittance', href: ROUTE.REMITTANCE },
  { label: 'Payout Locations' },
];

export default async function PayoutLocationsPage() {
  // Managed in the CMS. The bundled list is only used if the API is
  // unreachable, so the map still renders during an outage.
  const locations = await getMapLocations('payout_location', payoutLocations);

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Payout Locations"
        buttonLabel="Contact your nearest branch"
      />
      <MapExplorer
        locationType="payout_location"
        locations={locations}
        resultsLabel="payout locations found"
      />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
