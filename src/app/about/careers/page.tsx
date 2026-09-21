import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import CareersJobsSection from './_components/CareersJobsSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Careers' },
];

export default function CareersPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Careers"
        buttonLabel="Contact your nearest branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <CareersJobsSection />
      <ContactSection />
    </main>
  );
}
