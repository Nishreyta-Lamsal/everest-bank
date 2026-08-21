import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import SMEProductsSection from './_components/products/SMEProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import SMEStatsSection from './_components/SMEStatsSection';
import SMEFinancingSection from './_components/SMEFinancingSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { ROUTE } from '@/constants';
import { smeFaqs } from './_data/faqs';

const breadcrumbItems = [
  { label: 'Business', href: ROUTE.BUSINESS },
  { label: 'SME Banking' },
];

export default function SMEBankingPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image="/images/business/sme-banking-hero.png"
        imageAlt="A potter shaping clay pots, representing a small business Everest Bank supports"
        heading="SME Banking"
        buttonLabel="Open a Business Account"
        buttonHref="#"
        secondaryButtonHref="#"
      />
      <SMEProductsSection />
      <MountainDivider />
      <SMEStatsSection />
      <SMEFinancingSection />
      <OpenAccountSection />
      <FaqSection heading="Quick FAQs for SME Banking" items={smeFaqs} />
      <ExploreServicesSection />
    </main>
  );
}
