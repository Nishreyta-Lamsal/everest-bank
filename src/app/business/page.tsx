import MountainDivider from '@/components/shared/MountainDivider';
import BusinessHeroSection from './_components/BusinessHeroSection';
import BusinessProductsSection from './_components/BusinessProductsSection';
import BusinessFinancingSection from './_components/financing/BusinessFinancingSection';
import BusinessDigitalBankingSection from './_components/BusinessDigitalBankingSection';

export default function BusinessPage() {
  return (
    <main>
      <BusinessHeroSection />
      <BusinessProductsSection />
      <MountainDivider />
      <BusinessFinancingSection />
      <BusinessDigitalBankingSection />
    </main>
  );
}
