import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import EligibilityCheckerHeroSection from './_components/EligibilityCheckerHeroSection';
import EligibilityCheckerSection from './_components/EligibilityCheckerSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'Services' },
  { label: 'Tools', href: ROUTE.TOOLS },
  { label: 'Eligibility Checker' },
];

export default function EligibilityCheckerPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <EligibilityCheckerHeroSection />
      <EligibilityCheckerSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
