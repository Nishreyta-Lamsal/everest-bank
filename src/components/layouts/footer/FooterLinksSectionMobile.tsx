import Image from 'next/image';
import Link from 'next/link';

import FooterAccordionColumn from './FooterAccordionColumn';

import { footerLinkColumns, footerSocialLinks } from '@/data';

export default function FooterLinksSectionMobile() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex w-full flex-col gap-8 xl:hidden">
      <Image
        src="/icons/footer/everest-bank-logo-lockup.svg"
        alt="Everest Bank Limited — Consistent, Strong, Dependable"
        width={294}
        height={91}
        className="h-auto w-[182px]"
      />
      <div className="flex w-full flex-col items-start">
        {footerLinkColumns.map((column, index) => (
          <FooterAccordionColumn
            key={column.title}
            column={column}
            isLast={index === footerLinkColumns.length - 1}
          />
        ))}
      </div>
      <div className="flex w-full flex-col gap-3 px-4">
        <p className="font-heading text-title-2-mobile-md text-grey-500 w-[56px]">
          Socials:
        </p>
        <div className="flex w-full flex-wrap items-start gap-x-8 gap-y-2">
          {footerSocialLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="text-grey-400 text-body-3-mobile flex items-center gap-2 transition-colors hover:text-red-500"
            >
              <Icon className="size-[16px] shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-20 px-4">
        <Link
          href="#"
          className="font-heading text-title-2-mobile-md text-grey-400 transition-colors hover:text-red-500"
        >
          Site Map
        </Link>
        <Link
          href="#"
          className="font-heading text-title-2-mobile-md text-grey-400 transition-colors hover:text-red-500"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex w-full flex-col items-start gap-3 px-4">
        <p className="font-heading text-title-2-mobile-md text-grey-500">
          Get EBL Touch App
        </p>
        <div className="flex items-center gap-4">
          <Image
            src="/images/app-promo/google-play-badge.png"
            alt="Get it on Google Play"
            width={120}
            height={40}
          />
          <Image
            src="/images/app-promo/app-store-badge.png"
            alt="Download on the App Store"
            width={120}
            height={40}
          />
        </div>
      </div>
      <div className="text-grey-400 flex w-full flex-col gap-3 px-4">
        <p className="text-body-3-mobile w-[238px] opacity-80">
          Copyright © {currentYear} Everest Bank Limited. All Rights Reserved.
        </p>
        <a
          href="https://bigbracketshq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-3-mobile opacity-80"
        >
          Designed by: <span className="font-medium">Bigbrackets</span>
        </a>
        <a
          href="https://prixa.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body-3-mobile opacity-80"
        >
          Powered by: <span className="font-medium">Prixa Technologies</span>
        </a>
      </div>
    </div>
  );
}
