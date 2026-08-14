import HeroSection from './_components/HeroSection';
import ProductsSection from './_components/ProductsSection';
import MountainDivider from '@/components/shared/MountainDivider';
import LoansSection from './_components/LoansSection';
import CardsSection from './_components/CardsSection';
import AppPromoSection from './_components/AppPromoSection';
import CsrSection from './_components/CsrSection';
import TrustSection from './_components/TrustSection';
import NewsSection from './_components/NewsSection';
import ContactSection from '@/components/shared/ContactSection';

export default function PersonalPage() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <MountainDivider />
      <LoansSection />
      <CardsSection />
      <AppPromoSection />
      <CsrSection />
      <TrustSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
