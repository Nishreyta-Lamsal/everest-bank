import Image from 'next/image';

import { MailIcon, PhoneIcon } from '@/components/icons';

import type { FooterOfficer } from '@/data';

type FooterOfficerCardProps = FooterOfficer;

export default function FooterOfficerCard({
  title,
  name,
  photo,
  phone,
  extension,
  email,
}: FooterOfficerCardProps) {
  return (
    <div className="flex w-[297px] shrink-0 flex-col items-start justify-end gap-4">
      <p className="font-heading text-title-2-desktop-md text-grey-500">
        {title}
      </p>
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <div className="flex flex-col items-start justify-center gap-4">
          <Image
            src={photo}
            alt={name}
            width={160}
            height={110}
            className="h-[110px] w-[160px] rounded-[160px] object-cover"
          />
          <p className="w-[210px] text-body-3-desktop-md text-grey-400">
            {name}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-start gap-2">
            <PhoneIcon className="size-[22px] shrink-0 text-grey-400" />
            <p className="text-body-3-desktop-md text-grey-400">
              {phone}
              <br />
              {extension}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="size-[22px] shrink-0 text-grey-400" />
            <p className="text-body-3-desktop-md text-grey-400">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
