import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import AtmHeroSection from './_components/AtmHeroSection';
import MapFilterBar from '@/components/shared/map/MapFilterBar';
import MapSection from '@/components/shared/map/MapSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { atmLocations } from './_data/atm-locations';

const breadcrumbItems = [{ label: 'ATM' }];

export default function AtmPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <AtmHeroSection />
      <MapFilterBar searchPlaceholder="ATM name, address" />
      <MapSection locations={atmLocations} resultsLabel="ATMs found" />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
