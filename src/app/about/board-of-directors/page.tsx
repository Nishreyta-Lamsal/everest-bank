import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import BoardOfDirectorsHeroSection from './_components/BoardOfDirectorsHeroSection';
import BoardOfDirectorsContentSection from './_components/BoardOfDirectorsContentSection';

import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

const breadcrumbItems = [
  { label: 'About', href: ROUTE.ABOUT },
  { label: 'Board of Directors' },
];

export default function BoardOfDirectorsPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <BoardOfDirectorsHeroSection />
      <BoardOfDirectorsContentSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
