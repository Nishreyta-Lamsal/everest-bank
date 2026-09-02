import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import ProductListSection from '@/components/shared/product-list/ProductListSection';
import MountainDivider from '@/components/shared/MountainDivider';
import StatsHighlightSection from '@/components/shared/stats/StatsHighlightSection';
import RecommendationSection from '@/components/shared/recommendation/RecommendationSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { ROUTE } from '@/constants';
import { smeProducts, smeProductsImage } from './_data/products';
import { smeStats, smeStatsImage } from './_data/stats';
import { financingImage, financingRows } from './_data/financing';
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
      <ProductListSection
        products={smeProducts}
        image={smeProductsImage.src}
        imageAlt={smeProductsImage.alt}
      />
      <MountainDivider />
      <StatsHighlightSection
        heading="Supporting Nepal’s businesses with tailored financial solutions and dedicated relationship managers."
        stats={smeStats}
        image={smeStatsImage.src}
        imageAlt={smeStatsImage.alt}
      />
      <RecommendationSection
        heading="Find the Right Financing"
        labelHeading="Business Stage"
        valueHeading="Recommended Solution"
        rows={financingRows}
        primaryCtaLabel="Open Business Account"
        secondaryCtaLabel="Talk to an Expert"
        image={financingImage.src}
        imageAlt={financingImage.alt}
      />
      <OpenAccountSection />
      <FaqSection heading="Quick FAQs for SME Banking" items={smeFaqs} />
      <ExploreServicesSection />
    </main>
  );
}
