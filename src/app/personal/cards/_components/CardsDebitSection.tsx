import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CardOfferList from './card-offers/CardOfferList';

import { debitCardOffers } from '../_data';

export default function CardsDebitSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-15">
          <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:w-[577px]">
            Your account, in your pocket.
          </h2>
          <CardOfferList offers={debitCardOffers} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
