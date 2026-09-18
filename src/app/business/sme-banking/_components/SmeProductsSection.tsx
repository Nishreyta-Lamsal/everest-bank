import ProductListSection from '@/components/shared/product-list/ProductListSection';

import { getSectionContent } from '@/lib/get-section-content';

import { smeProducts, smeProductsImage } from '../_data/products';

import type { SmePageSection } from '@/api/services/business/sme-page.service';

type SmeProductsSectionProps = {
  sections?: SmePageSection[];
};

export default function SmeProductsSection({
  sections,
}: SmeProductsSectionProps) {
  const content = getSectionContent(sections, 'sme_products');

  return (
    <ProductListSection
      products={content?.products?.length ? content.products : smeProducts}
      image={content?.image?.src || smeProductsImage.src}
      imageAlt={content?.image?.alt || smeProductsImage.alt}
    />
  );
}
