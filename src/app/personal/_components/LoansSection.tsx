import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';
import ProductCard from '@/components/ui/cards/ProductCard';

import { loanCards } from '../_data';

export default function LoansSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-6 lg:gap-y-12">
          <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md order-1 lg:order-0 lg:w-[581px]">
            Financial support designed around life&rsquo;s biggest milestones.
          </h2>
          <Link
            href="#"
            className="order-3 block w-full lg:order-0 lg:inline-block lg:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full lg:w-auto">
              See more about loans
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-8 lg:order-0 lg:col-span-2 lg:flex-row lg:items-start lg:gap-10">
            {loanCards.map((card) => (
              <ProductCard
                key={card.title}
                href={card.href}
                image={card.image}
                title={card.title}
                className="lg:flex-1 lg:first:rounded-tl-[88px] lg:last:rounded-tr-[88px]"
              />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
