import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CardOfferList from './card-offers/CardOfferList';

import { creditCardOffers } from '../_data';

export default function CardsCreditSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-15">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[577px]">
            Spend now, pay later with rewards along the way.
          </h2>
          <CardOfferList offers={creditCardOffers} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
