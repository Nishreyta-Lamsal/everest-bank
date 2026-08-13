import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CarouselDots from '@/components/ui/carousel/CarouselDots';

type StatBannerProps = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export default function StatBanner({
  image,
  imageAlt,
  title,
  description,
}: StatBannerProps) {
  return (
    <section className="relative flex w-full flex-col xl:flex-row">
      <div className="relative h-99 overflow-hidden bg-[#b41518] xl:h-133 xl:flex-708 xl:bg-red-500">
        <Image
          src="/icons/trust/mountain-outline.svg"
          alt="Mountain outline"
          width={839}
          height={336}
          className="absolute -right-1.5 -bottom-1.5 h-40.25 w-auto max-w-none md:h-[63.02%] xl:right-0 xl:bottom-0.5"
        />
      </div>
      <div className="relative h-73.25 md:h-133 xl:flex-732">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
        <CarouselDots
          total={5}
          activeIndex={0}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <LayoutWrapper>
          <div className="relative h-99 xl:h-133">
            <p className="font-heading text-display-0-mobile-md xl:text-display-0-desktop-md absolute top-0 left-0 text-white uppercase">
              {title}
            </p>
            <p className="font-heading text-display-2-mobile-md xl:text-display-2-desktop-md absolute top-28.75 left-4 whitespace-nowrap text-white xl:top-[93.77%] xl:left-63">
              {description}
            </p>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
