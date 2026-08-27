import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import PayoutLocationList from './PayoutLocationList';

import { payoutLocations } from '../_data/payout-locations';

export default function PayoutLocationsMapSection() {
  return (
    <section className="w-full pt-6 pb-8 lg:py-8">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[52px]">
          <div
            role="region"
            aria-label="Payout locations map"
            className="bg-grey-25 h-[335px] w-full shrink-0 overflow-hidden rounded-2xl lg:h-[750px] lg:w-[800px]"
          />
          <PayoutLocationList locations={payoutLocations} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
