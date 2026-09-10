import Image from 'next/image';

import { icon } from '@/components/icons';

import type { FooterOfficerCardProps } from '@/types';

export default function FooterOfficerCard({
  title,
  name,
  photo,
  phone,
  extension,
  email,
}: FooterOfficerCardProps) {
  return (
    <div className=":justify-end flex w-full flex-col items-start gap-2 lg:w-[297px] xl:shrink-0 xl:gap-4">
      <p className="font-heading text-title-3-mobile-md text-grey-500 xl:text-title-3-desktop-md">
        {title}
      </p>
      <div className="flex w-full items-start gap-4 lg:flex-col lg:justify-center">
        <Image
          src={photo}
          alt={name}
          width={160}
          height={110}
          className="h-[86px] w-[124px] shrink-0 rounded-[160px] object-cover xl:h-[110px] xl:w-[160px]"
        />
        <div className="flex flex-col items-start gap-2 xl:gap-4">
          <p className="text-body-3-mobile-md text-grey-400 xl:text-body-3-desktop-md xl:w-[210px]">
            {name}
          </p>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-2">
              <icon.phone className="text-grey-400 size-[16px] shrink-0 xl:size-[22px]" />
              <p className="text-body-3-mobile-md text-grey-400 xl:text-body-3-desktop-md">
                {phone}
                <br />
                {extension}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <icon.mail className="text-grey-400 size-[16px] shrink-0 xl:size-[22px]" />
              <p className="text-body-3-mobile-md text-grey-400 xl:text-body-3-desktop-md">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
