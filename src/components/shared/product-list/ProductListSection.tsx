import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ProductList from './ProductList';

import type { ProductListEntry } from '@/types';

type ProductListSectionProps = {
  products: ProductListEntry[];
  image: string;
  imageAlt: string;
};

export default function ProductListSection({
  products,
  image,
  imageAlt,
}: ProductListSectionProps) {
  return (
    <section className="w-full bg-white py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-6">
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-lg rounded-tl-[148px] md:h-[440px] lg:w-[405px] lg:rounded-tl-[260px]">
            <Image src={image} alt={imageAlt} fill className="object-cover" />
          </div>
          <ProductList products={products} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
