import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import SMEProductList from './SMEProductList';

import { smeProducts } from '../../_data/products';

export default function SMEProductsSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:gap-6">
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-lg rounded-tl-[148px] md:h-[440px] lg:w-[405px] lg:rounded-tl-[260px]">
            <Image
              src="/images/business/sme-loans-product.png"
              alt="A woman entrepreneur standing in front of her handicraft bag shop"
              fill
              className="object-cover"
            />
          </div>
          <SMEProductList products={smeProducts} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
