import DirectorProfile from './DirectorProfile';

import type { Director } from '../../_data/directors';

type DirectorCardProps = {
  directors: Director[];
};

export default function DirectorCard({ directors }: DirectorCardProps) {
  return (
    <div className="lg:bg-cream-25 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-center lg:gap-6 lg:rounded-2xl lg:p-6">
      {directors.map((director) => (
        <div
          key={director.id}
          className="bg-cream-25 w-full rounded-2xl px-4 py-5 lg:rounded-none lg:bg-transparent lg:p-0"
        >
          <DirectorProfile director={director} />
        </div>
      ))}
    </div>
  );
}
