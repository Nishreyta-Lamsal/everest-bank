import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

type ContentHeroSectionProps = {
  image: string;
  imageAlt: string;
  heading: string;
  buttonLabel: string;
  buttonHref: string;
  secondaryButtonHref?: string;
  secondaryButtonAriaLabel?: string;
};

export default function ContentHeroSection({
  image,
  imageAlt,
  heading,
  buttonLabel,
  buttonHref,
  secondaryButtonHref,
  secondaryButtonAriaLabel,
}: ContentHeroSectionProps) {
  return (
    <section className="relative h-[312px] w-full overflow-hidden lg:h-[528px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/85 lg:to-black/40" />

      <div className="absolute inset-x-0 bottom-6 z-10 lg:bottom-15">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <h1 className="font-heading text-display-1-mobile-md lg:text-display-1-desktop-md text-white md:max-w-[750px]">
              {heading}
            </h1>
            <div className="flex w-full items-center gap-4 lg:w-auto">
              <Link href={buttonHref} className="flex-1 lg:flex-none">
                <Button
                  variant="primary"
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
                >
                  {buttonLabel}
                </Button>
              </Link>
              {secondaryButtonHref && (
                <Link
                  href={secondaryButtonHref}
                  aria-label={secondaryButtonAriaLabel ?? buttonLabel}
                  className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-white text-red-500 transition-colors hover:bg-red-50"
                >
                  <icon.arrowShareRight className="size-[18px]" />
                </Link>
              )}
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
