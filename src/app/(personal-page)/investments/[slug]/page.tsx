import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import MountainHeroSection from '@/components/shared/MountainHeroSection';
import InvestmentContentSection from './_components/InvestmentContentSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/content/ContactSection';

import { ROUTE } from '@/constants';

type InvestmentsDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InvestmentsDetailsPage({
  params,
}: InvestmentsDetailsPageProps) {
  await params;

  return (
    <main className="relative">
      <Breadcrumbs items={[{ label: 'Shares' }]} tone="dark" />
      <MountainHeroSection
        heading="Shares"
        buttonLabel="Contact your nearest branch"
        buttonHref={ROUTE.BRANCHES}
      />
      <InvestmentContentSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
