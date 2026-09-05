import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import NoticeSection from './_components/NoticeSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [{ label: 'Notice' }];

export default function NoticePage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Notice"
        buttonLabel="Contact your nearest branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <NoticeSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
