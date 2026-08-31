'use client';

import { useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import PayoutLocationList from './PayoutLocationList';

import { payoutLocations } from '../_data/payout-locations';

export default function PayoutLocationsMapSection() {
  const [activeLocationId, setActiveLocationId] = useState(
    payoutLocations[0].id,
  );

  const activeLocation =
    payoutLocations.find((location) => location.id === activeLocationId) ??
    payoutLocations[0];

  return (
    <section className="w-full pt-6 pb-8 lg:py-8">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <iframe
            key={activeLocation.id}
            src={activeLocation.mapUrl}
            title={`Map of Everest Bank ${activeLocation.name}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="bg-grey-25 h-[335px] w-full shrink-0 rounded-2xl border-0 md:h-[600px] lg:w-[600px] xl:h-[750px] xl:w-[800px]"
          />
          <PayoutLocationList
            locations={payoutLocations}
            activeLocationId={activeLocationId}
            onSelectLocation={setActiveLocationId}
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
