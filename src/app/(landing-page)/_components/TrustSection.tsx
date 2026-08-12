import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CarouselDots from '@/components/ui/carousel/CarouselDots';

export default function TrustSection() {
  return (
    <section className="relative flex w-full">
      <div className="bg-red-500 relative h-133 flex-708 overflow-hidden">
        <Image
          src="/icons/trust/mountain-outline.svg"
          alt="Mountain outline"
          width={839}
          height={336}
          className="absolute bottom-0.5 right-0 h-[63.02%] w-auto max-w-none"
        />
      </div>
      <div className="relative h-133 flex-732">
        <Image
          src="/images/trust/branch-photo.png"
          alt="An Everest Bank Limited branch"
          fill
          className="object-cover"
        />
        <CarouselDots
          total={5}
          activeIndex={0}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <LayoutWrapper>
          <div className="relative h-133">
            <p className="font-heading text-display-0-desktop-md absolute top-0 left-0 text-white uppercase">
              30+
            </p>
            <p className="font-heading text-display-2-desktop-md absolute top-[93.77%] left-63 text-white whitespace-nowrap">
              Years of trust
            </p>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
