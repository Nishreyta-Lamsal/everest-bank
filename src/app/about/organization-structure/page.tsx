import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import OrganizationStructureContentSection from './_components/OrganizationStructureContentSection';

import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Organizational Structure' },
];

export default function OrganizationStructurePage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image="/images/about/profile/hero-bg.png"
        imageAlt="Signage on the exterior of an Everest Bank branch"
        heading="Organizational Structure"
        buttonLabel="Contact Near Branch"
        buttonHref="#"
      />
      <OrganizationStructureContentSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
