import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

export default function AboutHeroSection() {
  return (
    <section className="relative h-[312px] w-full overflow-hidden bg-[#d9d9d9] lg:h-[528px] lg:bg-[#fff5ed]">
      <Image
        src="/images/about/about-hero-bg.png"
        alt="A family sitting together on the floor of their living room"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/85 lg:to-black/40" />

      <div className="absolute inset-x-0 bottom-6 z-10 lg:bottom-15">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <h1 className="font-heading text-heading-h2-mobile-md md:text-display-1-mobile-md lg:text-display-1-desktop-md max-w-[278px] text-white md:max-w-[713px]">
              More Than Banking, A Partner in Progress.
            </h1>
            <Link href="#" className="w-full lg:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
              >
                Apply for your card
              </Button>
            </Link>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
