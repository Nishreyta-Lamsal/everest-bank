import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import ContentStatsSection from '@/components/shared/content/ContentStatsSection';
import CorporateMissionAndVisionContentSection from './_components/CorporateMissionAndVisionContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { corporateMissionAndVisionStats } from './_data/stats';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Corporate Mission & Vision' },
];

export default function CorporateMissionAndVisionPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image="/images/about/profile/hero-bg.png"
        imageAlt="Signage on the exterior of an Everest Bank branch"
        heading="Corporate Mission & Vision"
        buttonLabel="Contact Near Branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <ContentStatsSection stats={corporateMissionAndVisionStats} />
      <CorporateMissionAndVisionContentSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
