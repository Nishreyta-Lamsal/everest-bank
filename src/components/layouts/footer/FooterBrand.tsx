import Image from 'next/image';

import type { FooterBrandProps } from '@/types';

export default function FooterBrand({ content }: FooterBrandProps) {
  return (
    <div className="flex w-[295px] shrink-0 flex-col gap-30.5">
      <Image
        src={content.logoUrl ?? '/icons/footer/everest-bank-logo-lockup.svg'}
        alt="Everest Bank Limited — Consistent, Strong, Dependable"
        width={294}
        height={91}
      />
      <div className="flex flex-col items-start gap-4">
        <p className="font-heading text-title-3-desktop-md text-grey-400">
          {content.appPromoLabel}
        </p>
        <Image
          src={content.appQrUrl ?? '/images/footer/ebl-touch-app-qr.png'}
          alt="Scan to get the EBL Touch App"
          width={143}
          height={143}
          className="size-[143px]"
        />
      </div>
    </div>
  );
}
