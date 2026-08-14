import Image from 'next/image';

import { MailIcon, PhoneIcon } from '@/components/icons';

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
    <div className=":justify-end flex w-full flex-col items-start gap-2 lg:w-74.25 xl:shrink-0 xl:gap-4">
      <p className="font-heading text-title-2-desktop-md text-grey-500">
        {title}
      </p>
      <div className="flex w-full items-start gap-4 lg:flex-col lg:justify-center">
        <Image
          src={photo}
          alt={name}
          width={160}
          height={110}
          className="h-21.5 w-31 shrink-0 rounded-[160px] object-cover xl:h-27.5 xl:w-40"
        />
        <div className="flex flex-col items-start gap-2 xl:gap-4">
          <p className="text-body-3-mobile-md text-grey-400 xl:text-body-3-desktop-md xl:w-52.5">
            {name}
          </p>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-2">
              <PhoneIcon className="text-grey-400 size-4 shrink-0 xl:size-5.5" />
              <p className="text-body-3-mobile-md text-grey-400 xl:text-body-3-desktop-md">
                {phone}
                <br />
                {extension}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="text-grey-400 size-4 shrink-0 xl:size-5.5" />
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
