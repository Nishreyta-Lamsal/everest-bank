import BusinessHeroSection from './_components/BusinessHeroSection';
import BusinessProductsSection from './_components/BusinessProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import BusinessFinancingSection from './_components/financing/BusinessFinancingSection';
import BusinessDigitalBankingSection from './_components/BusinessDigitalBankingSection';
import BusinessIndustriesSection from './_components/BusinessIndustriesSection';
import BusinessTrustSection from './_components/BusinessTrustSection';
import BusinessRelationshipManagerSection from './_components/BusinessRelationshipManagerSection';
import NewsSection from '@/components/shared/news/NewsSection';
import ContactSection from '@/components/shared/ContactSection';

export default function BusinessPage() {
  return (
    <main>
      <BusinessHeroSection />
      <BusinessProductsSection />
      <MountainDivider />
      <BusinessFinancingSection />
      <BusinessDigitalBankingSection />
      <BusinessIndustriesSection />
      <BusinessTrustSection />
      <BusinessRelationshipManagerSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
