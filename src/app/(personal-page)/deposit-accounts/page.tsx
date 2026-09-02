import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import ProductListSection from '@/components/shared/product-list/ProductListSection';
import MountainDivider from '@/components/shared/MountainDivider';
import StatsHighlightSection from '@/components/shared/stats/StatsHighlightSection';
import RecommendationSection from '@/components/shared/recommendation/RecommendationSection';
import OpenAccountSection from '@/components/shared/OpenAccountSection';
import FaqSection from '@/components/shared/faqs/FaqSection';
import ExploreServicesSection from '@/components/shared/ExploreServicesSection';

import { depositProducts, depositProductsImage } from './_data/products';
import { depositStats, depositStatsImage } from './_data/stats';
import { idealAccountImage, idealAccountRows } from './_data/ideal-account';
import { depositFaqs } from './_data/faqs';

const breadcrumbItems = [{ label: 'Accounts' }, { label: 'Deposit Accounts' }];

export default function DepositAccountsPage() {
  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      <ContentHeroSection
        image="/images/deposit-accounts/deposit-accounts-hero.png"
        imageAlt="A woman smiling as she puts a banknote into a piggy bank at home"
        heading="Deposit Accounts"
        buttonLabel="Open Your Account in 3 Minutes"
        buttonHref="#"
        secondaryButtonHref="#"
        secondaryButtonAriaLabel="Explore all deposit accounts"
      />
      <ProductListSection
        products={depositProducts}
        image={depositProductsImage.src}
        imageAlt={depositProductsImage.alt}
      />
      <MountainDivider />
      <StatsHighlightSection
        heading="Trusted by customers for decades, Everest Bank delivers reliable banking solutions for every stage of life."
        stats={depositStats}
        image={depositStatsImage.src}
        imageAlt={depositStatsImage.alt}
      />
      <RecommendationSection
        heading="Find Your Ideal Account"
        labelHeading="Need"
        valueHeading="Recommended Account"
        rows={idealAccountRows}
        primaryCtaLabel="Open Your Account in 3 Minutes"
        secondaryCtaLabel="Talk to the nearest bank"
        image={idealAccountImage.src}
        imageAlt={idealAccountImage.alt}
      />
      <OpenAccountSection />
      <FaqSection
        heading="Quick FAQs for Deposit Accounts"
        items={depositFaqs}
      />
      <ExploreServicesSection />
    </main>
  );
}
