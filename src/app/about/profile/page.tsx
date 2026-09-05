import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import ContentStatsSection from '@/components/shared/content/ContentStatsSection';
import ProfileContentSection from './_components/ProfileContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { profileStats } from './_data/stats';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Profile' },
];

export default function ProfilePage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image="/images/about/profile/hero-bg.png"
        imageAlt="Signage on the exterior of an Everest Bank branch"
        heading="Profile"
        buttonLabel="Contact Near Branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <ContentStatsSection stats={profileStats} />
      <ProfileContentSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
