import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

export default function CardsHeroSection() {
  return (
    <section className="relative h-[312px] w-full overflow-hidden lg:h-[528px]">
      <Image
        src="/images/cards/card-showcase-bg.png"
        alt="A hand holding an Everest Bank Visa card in front of Kathmandu Durbar Square at sunset"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/85 lg:to-black/40" />

      <div className="absolute inset-x-0 bottom-8 z-10 lg:bottom-15">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-heading text-heading-h2-mobile-md md:text-display-1-mobile-md lg:text-display-1-desktop-md max-w-[280px] text-white lg:max-w-[535px]">
              Cards built for the way Nepal pays.
            </h1>
            <Link href="#" className="w-full lg:w-auto">
              <Button variant="primary" size="lg" className="w-full lg:w-auto">
                Apply for your card
              </Button>
            </Link>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
