import { MapPinIcon, TelephoneIcon } from '@/components/icons';

import type { PayoutLocation } from '../_data/payout-locations';

type PayoutLocationCardProps = {
  location: PayoutLocation;
};

export default function PayoutLocationCard({
  location,
}: PayoutLocationCardProps) {
  return (
    <article className="flex w-full items-start rounded-[12px] border border-orange-50 bg-white p-4">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
        <div className="flex items-center gap-3 lg:gap-4">
          <MapPinIcon className="size-[18px] shrink-0 text-orange-500 lg:size-[24px]" />
          <h3 className="font-heading text-title-2-mobile lg:text-title-2-desktop text-grey-500">
            {location.name}
          </h3>
        </div>
        <div className="flex flex-col items-start gap-2 pl-[30px] lg:pl-12">
          <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-400">
            {location.address}
          </p>
          <div className="flex items-center gap-2">
            <TelephoneIcon className="text-grey-400 size-[16px] shrink-0" />
            <a
              href={`tel:${location.phone}`}
              className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 hover:underline"
            >
              {location.phone}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
