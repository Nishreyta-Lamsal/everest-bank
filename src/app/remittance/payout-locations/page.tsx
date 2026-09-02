import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import PayoutLocationsFilterBar from './_components/PayoutLocationsFilterBar';
import PayoutLocationsMapSection from './_components/PayoutLocationsMapSection';

import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

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
      <section className="w-full pt-8 pb-6 lg:pt-12">
        <LayoutWrapper>
          <PayoutLocationsFilterBar />
        </LayoutWrapper>
      </section>
      <PayoutLocationsMapSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
