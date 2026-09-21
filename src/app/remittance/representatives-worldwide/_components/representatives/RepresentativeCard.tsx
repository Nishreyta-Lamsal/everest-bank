import { icon } from '@/components/icons';

import type { Representative } from '../../_data/representatives';

type RepresentativeCardProps = {
  representative: Representative;
};

export default function RepresentativeCard({
  representative,
}: RepresentativeCardProps) {
  return (
    <div className="bg-cream-25 border-grey-bluish-grey w-full rounded-lg border border-solid p-6">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex flex-col items-start gap-3">
          <p className="font-heading text-heading-h4-desktop-md text-neutral-800">
            {representative.bankName}
          </p>
          <p className="font-heading text-title-3-desktop text-grey-400">
            {representative.contactPerson}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <icon.mapPin className="text-grey-400 size-5 shrink-0" />
          <p className="text-body-3-desktop text-grey-500">
            {representative.address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <icon.email className="text-grey-400 size-5 shrink-0" />
          <p className="text-body-3-desktop text-grey-500">
            Email: {representative.email}
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-3.5">
          <div className="flex items-center gap-2">
            <icon.telephone className="text-grey-400 size-5 shrink-0" />
            <p className="text-body-3-desktop text-grey-500">
              Phone: {representative.phone},
            </p>
          </div>
          <div className="flex items-center gap-2">
            <icon.printer className="text-grey-400 size-5 shrink-0" />
            <p className="text-body-3-desktop text-grey-500">
              Fax: {representative.fax}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
