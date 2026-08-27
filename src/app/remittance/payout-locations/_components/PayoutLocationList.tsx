import PayoutLocationCard from './PayoutLocationCard';

import type { PayoutLocation } from '../_data/payout-locations';

type PayoutLocationListProps = {
  locations: PayoutLocation[];
};

export default function PayoutLocationList({
  locations,
}: PayoutLocationListProps) {
  return (
    <div className="flex w-full flex-col gap-4 lg:w-[409px]">
      <p className="text-body-3-desktop text-grey-400 hidden lg:block">
        Total Search: {locations.length} payout locations found
      </p>
      <div className="scrollbar-slim flex flex-col gap-4 lg:max-h-[714px] lg:overflow-y-auto lg:pr-6">
        {locations.map((location) => (
          <PayoutLocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
