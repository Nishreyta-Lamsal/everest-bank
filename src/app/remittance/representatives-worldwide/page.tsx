import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import RepresentativesSection from './_components/RepresentativesSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'Remittance', href: ROUTE.REMITTANCE },
  { label: 'Representatives Worldwide' },
];

export default function RepresentativesWorldwidePage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Representatives Worldwide"
        buttonLabel="Contact your nearest branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <RepresentativesSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
