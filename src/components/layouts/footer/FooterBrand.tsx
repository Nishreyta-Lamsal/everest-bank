import Image from 'next/image';

export default function FooterBrand() {
  return (
    <div className="flex w-[295px] shrink-0 flex-col gap-30.5">
      <Image
        src="/icons/footer/everest-bank-logo-lockup.svg"
        alt="Everest Bank Limited — Consistent, Strong, Dependable"
        width={294}
        height={91}
      />
      <div className="flex flex-col items-start gap-4">
        <p className="font-heading text-title-2-desktop-md text-grey-400">
          Get EBL Touch App
        </p>
        <Image
          src="/images/footer/ebl-touch-app-qr.png"
          alt="Scan to get the EBL Touch App"
          width={143}
          height={143}
          className="size-[143px]"
        />
      </div>
    </div>
  );
}
