import Image from 'next/image';
import Link from 'next/link';

import type { ProductCardData } from '../../_data';

type ProductCardProps = ProductCardData & {
  showDecoration?: boolean;
};

export default function ProductCard({
  title,
  subtitle,
  href,
  icon: Icon,
  showDecoration = false,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="border-orange-50 hover:bg-grey-bluish-grey group relative flex flex-1 flex-col items-start gap-6 overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300 ease-in-out hover:rounded-tl-[48px]"
    >
      <Icon className="text-orange-500 size-13" />
      <div className="flex flex-col items-start gap-2">
        <p className="font-heading text-heading-h4-desktop text-grey-500">
          {title}
        </p>
        <p className="text-body-3-desktop text-grey-400">{subtitle}</p>
      </div>
      {showDecoration && (
        <Image
          src="/images/products/open-account-money-bag.png"
          alt=""
          width={210}
          height={210}
          className="pointer-events-none absolute -top-3.75 left-53 size-52.5 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </Link>
  );
}
