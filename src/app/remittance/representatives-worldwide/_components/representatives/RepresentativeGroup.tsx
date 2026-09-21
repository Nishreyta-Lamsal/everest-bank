import RepresentativeCard from './RepresentativeCard';

import type { RepresentativeGroup as RepresentativeGroupType } from '../../_data/representatives';

type RepresentativeGroupProps = {
  group: RepresentativeGroupType;
};

export default function RepresentativeGroup({
  group,
}: RepresentativeGroupProps) {
  return (
    <div className="flex w-full flex-col items-start gap-5">
      <p className="font-heading text-title-2-desktop text-grey-400 w-full">
        {group.heading}
      </p>
      <div className="flex w-full flex-col items-start gap-6">
        {group.representatives.map((representative) => (
          <RepresentativeCard
            key={representative.id}
            representative={representative}
          />
        ))}
      </div>
    </div>
  );
}
