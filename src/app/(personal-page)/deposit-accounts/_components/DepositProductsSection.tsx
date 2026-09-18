import ProductListSection from '@/components/shared/product-list/ProductListSection';

import { getSectionContent } from '@/lib/get-section-content';

import { depositProducts, depositProductsImage } from '../_data/products';

import type { DepositPageSection } from '@/api/services/personal/deposit-accounts/deposit-page.service';

type DepositProductsSectionProps = {
  sections?: DepositPageSection[];
};

export default function DepositProductsSection({
  sections,
}: DepositProductsSectionProps) {
  const content = getSectionContent(sections, 'deposit_products');

  return (
    <ProductListSection
      products={content?.products?.length ? content.products : depositProducts}
      image={content?.image?.src || depositProductsImage.src}
      imageAlt={content?.image?.alt || depositProductsImage.alt}
    />
  );
}
