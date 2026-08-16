import type { ComponentType, SVGProps } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

type FeatureCardProps = {
  title: string;
  subtitle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  featured?: boolean;
  decorationSrc?: string;
};

export default function FeatureCard({
  title,
  subtitle,
  href,
  icon: Icon,
  featured = false,
  decorationSrc,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'border-grey-bluish-grey bg-grey-bluish-grey group xl:hover:bg-grey-bluish-grey relative flex flex-col items-start gap-6 overflow-hidden rounded-tl-[48px] rounded-tr-xl rounded-br-xl rounded-bl-xl border p-4 transition-all duration-300 ease-in-out xl:flex-1 xl:rounded-tl-xl xl:border-orange-50 xl:bg-white xl:p-6 xl:hover:rounded-tl-[48px]',
        featured && 'col-span-2',
      )}
    >
      <Icon className="size-[32px] text-orange-500 xl:size-[52px]" />
      <div
        className={cn(
          'flex w-full flex-col items-start gap-2',
          featured &&
            'flex-row items-center justify-between xl:flex-col xl:items-start',
        )}
      >
        <h3 className="font-heading text-heading-h3-mobile text-grey-500 xl:text-heading-h4-desktop">
          {title}
        </h3>
        <p
          className={cn(
            'text-body-3-mobile text-grey-400 xl:text-body-3-desktop',
            !featured && 'hidden xl:block',
          )}
        >
          {subtitle}
        </p>
      </div>
      {decorationSrc && (
        <Image
          src={decorationSrc}
          alt=""
          width={210}
          height={210}
          className="pointer-events-none absolute -top-3.75 left-53 size-[210px] opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </Link>
  );
}
