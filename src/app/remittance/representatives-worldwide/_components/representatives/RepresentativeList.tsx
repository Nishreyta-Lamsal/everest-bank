import RepresentativeGroup from './RepresentativeGroup';

import type { RepresentativeGroup as RepresentativeGroupType } from '../../_data/representatives';

type RepresentativeListProps = {
  groups: RepresentativeGroupType[];
};

export default function RepresentativeList({
  groups,
}: RepresentativeListProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start">
      {groups.map((group) => (
        <div key={group.id} className="w-full min-w-0 lg:flex-1">
          <RepresentativeGroup group={group} />
        </div>
      ))}
    </div>
  );
}
