import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

type MountainHeroSectionProps = {
  heading: string;
  buttonLabel: string;
  buttonHref?: string;
};

export default function MountainHeroSection({
  heading,
  buttonLabel,
  buttonHref = '#',
}: MountainHeroSectionProps) {
  return (
    <section className="relative h-[292px] w-full overflow-hidden bg-[#d9d9d9] lg:h-[308px] lg:bg-[#fff5ed]">
      <Image
        src="/images/shared/mountain-hero-base.png"
        alt=""
        fill
        priority
        className="hidden object-cover lg:block"
      />
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/shared/mountain-hero-panorama.png"
          alt="Stylized illustration of a snow-capped mountain range"
          width={1440}
          height={542}
          priority
          className="absolute top-[-36.58%] left-[-58.36%] h-[136.48%] w-[216.73%] max-w-none object-cover lg:top-[-70.82%] lg:left-0 lg:h-[175.98%] lg:w-full"
        />
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 lg:bottom-11">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-heading text-display-1-mobile-md lg:text-display-1-desktop-md text-grey-500">
              {heading}
            </h1>
            <Link href={buttonHref} className="w-[261px] lg:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
              >
                {buttonLabel}
              </Button>
            </Link>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
