import RepresentativeCard from './RepresentativeCard';

import type { Representative } from '../../_data/representatives';

type RepresentativeListProps = {
  representatives: Representative[];
};

export default function RepresentativeList({
  representatives,
}: RepresentativeListProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start">
      {representatives.map((representative) => (
        <div key={representative.id} className="w-full min-w-0 lg:flex-1">
          <RepresentativeCard representative={representative} />
        </div>
      ))}
    </div>
  );
}
