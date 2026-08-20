import Image from 'next/image';

import type { Director } from '../../_data/directors';

type DirectorProfileProps = {
  director: Director;
};

export default function DirectorProfile({ director }: DirectorProfileProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[150px] w-[120px] shrink-0">
        <Image
          src={director.image}
          alt={director.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center bg-red-700 px-4 pt-2">
          <p className="font-heading text-title-2-mobile-md lg:text-title-0-mobile-md text-white">
            {director.name}
          </p>
        </div>
        <p className="text-body-3-mobile lg:text-body-2-mobile text-grey-500">
          {director.title}
        </p>
      </div>
    </div>
  );
}
