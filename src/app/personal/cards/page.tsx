import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import CardsHeroSection from './_components/CardsHeroSection';
import CardsTrustBarSection from './_components/CardsTrustBarSection';
import CardsNetworkSection from './_components/CardsNetworkSection';
import MountainDivider from '@/components/shared/MountainDivider';
import CardsCreditSection from './_components/CardsCreditSection';
import CardsDebitSection from './_components/CardsDebitSection';
import CardsTravelSection from './_components/CardsTravelSection';
import CardsProcessSection from './_components/process/CardsProcessSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { cardFaqs } from './_data';

const breadcrumbItems = [{ label: 'Cards' }];

export default function CardsPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <CardsHeroSection />
      <CardsTrustBarSection />
      <CardsNetworkSection />
      <MountainDivider />
      <CardsCreditSection />
      <CardsDebitSection />
      <CardsTravelSection />
      <CardsProcessSection />
      <FaqSection heading="Quick FAQs for Everest cards" items={cardFaqs} />
      <ExploreServicesSection />
    </main>
  );
}
