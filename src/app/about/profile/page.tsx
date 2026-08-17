import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ProfileHeroSection from './_components/ProfileHeroSection';
import ProfileStatsSection from './_components/ProfileStatsSection';
import ProfileContentSection from './_components/ProfileContentSection';
import NewsSection from '@/components/shared/news/NewsSection';

import { ROUTE } from '@/constants';
import ContactSection from '@/components/shared/ContactSection';

const breadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Profile' },
];

export default function ProfilePage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ProfileHeroSection />
      <ProfileStatsSection />
      <ProfileContentSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
