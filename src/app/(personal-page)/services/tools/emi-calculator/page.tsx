import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import EMICalculatorHeroSection from './_components/EMICalculatorHeroSection';
import EMICalculatorSection from './_components/EMICalculatorSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

export const revalidate = 60;

const breadcrumbItems = [
  { label: 'Services' },
  { label: 'Tools', href: ROUTE.TOOLS },
  { label: 'EMI Calculator' },
];

export default function EMICalculatorPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <EMICalculatorHeroSection />
      <EMICalculatorSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
