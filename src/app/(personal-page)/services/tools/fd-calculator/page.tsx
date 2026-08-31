import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import FDCalculatorHeroSection from './_components/FDCalculatorHeroSection';
import FDCalculatorSection from './_components/FDCalculatorSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'Services' },
  { label: 'Tools', href: ROUTE.TOOLS },
  { label: 'FD Calculator' },
];

export default function FDCalculatorPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <FDCalculatorHeroSection />
      <FDCalculatorSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
