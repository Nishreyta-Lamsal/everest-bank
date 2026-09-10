import type { ReactNode } from 'react';
import Link from 'next/link';

import GradientCard from '@/components/ui/cards/GradientCard';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import type { FooterSupportCardProps } from '@/types';

export default function FooterSupportCard({ content }: FooterSupportCardProps) {
  function withHref(href: string | undefined, button: ReactNode) {
    return href ? (
      <Link href={href} className="w-full xl:w-auto">
        {button}
      </Link>
    ) : (
      button
    );
  }

  return (
    <GradientCard className="flex flex-col items-start gap-4 px-4 py-8 xl:h-[286px] xl:w-[620px] xl:shrink-0 xl:justify-between xl:gap-0 xl:p-8">
      <div className="flex flex-col gap-1 xl:contents">
        <p className="font-heading text-title-2-mobile text-grey-500 xl:text-title-2-desktop">
          {content.title}
        </p>
        <p className="text-body-3-mobile text-grey-400 xl:text-body-2-desktop">
          {content.description}
        </p>
      </div>
      <div className="flex flex-col items-start gap-2 xl:flex-row xl:gap-11">
        <div className="flex items-center gap-2">
          <icon.globe className="text-grey-500 size-[16px] shrink-0 xl:size-[20px]" />
          <p className="text-body-2-mobile-md text-grey-500 xl:text-body-2-desktop-md">
            SWIFT: {content.swiftCode}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <icon.phoneCall className="text-grey-500 size-[16px] shrink-0 xl:size-[20px]" />
          <p className="text-body-2-mobile-md text-grey-500 xl:text-body-2-desktop-md">
            Toll free: {content.tollFreeNumber}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-2 xl:flex-row xl:gap-4">
        {withHref(
          content.callHref,
          <Button
            variant="tertiary-white"
            size="lg"
            className="text-body-4-desktop-md xl:text-body-3-desktop-md h-[42px] w-full xl:h-[46px] xl:w-[270px]"
            leftIcon={<icon.phoneCall className="size-[16px]" />}
          >
            Call Us
          </Button>,
        )}
        {withHref(
          content.enquireHref,
          <Button
            variant="secondary"
            size="lg"
            className="text-body-4-desktop-md xl:text-body-3-desktop-md h-[42px] w-full text-red-500! xl:h-[46px] xl:w-[270px] xl:text-red-600!"
          >
            Make an enquire
          </Button>,
        )}
      </div>
    </GradientCard>
  );
}
