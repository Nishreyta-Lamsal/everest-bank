import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import MapFilterBar from '@/components/shared/map/MapFilterBar';
import MapSection from '@/components/shared/map/MapSection';

import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';
import { payoutLocations } from './_data/payout-locations';

const breadcrumbItems = [
  { label: 'Remittance', href: ROUTE.REMITTANCE },
  { label: 'Payout Locations' },
];

export default function PayoutLocationsPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Payout Locations"
        buttonLabel="Contact your nearest branch"
      />
      <MapFilterBar />
      <MapSection
        locations={payoutLocations}
        resultsLabel="payout locations found"
      />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
