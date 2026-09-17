import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import AuctionNoticeSection from './_components/AuctionNoticeSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [{ label: 'Auction Notice' }];

export default function AuctionNoticePage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} tone="dark" />
      <MountainHeroSection
        heading="Auction Notice"
        buttonLabel="Contact your nearest branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <AuctionNoticeSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
