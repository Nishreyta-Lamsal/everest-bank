import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AtmHeroSection from './_components/AtmHeroSection';
import MapExplorer from '@/components/shared/map/MapExplorer';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { atmLocations } from './_data/atm-locations';

const breadcrumbItems = [{ label: 'ATM' }];

export default function AtmPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <AtmHeroSection />
      <MapExplorer
        locations={atmLocations}
        searchPlaceholder="ATM name, address"
        resultsLabel="ATMs found"
      />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
