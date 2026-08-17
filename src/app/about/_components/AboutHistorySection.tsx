import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

export default function AboutHistorySection() {
  return (
    <section className="w-full bg-white py-16 lg:pt-[120px] lg:pb-[60px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-col items-start gap-6 lg:w-[429px] lg:shrink-0 lg:gap-8">
            <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:max-w-[425px]">
              Rooted in Trust. Growing Through People.
            </h2>
            <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 lg:max-w-[396px]">
              For over three decades, Everest Bank has built a culture of
              integrity, collaboration, and service excellence that continues to
              drive its success.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-1 xl:flex-row xl:items-start xl:gap-12">
            <div className="relative h-[286px] w-full overflow-hidden rounded-lg md:h-[394px] lg:max-w-[429px] lg:rounded-3xl lg:rounded-tl-[260px]">
              <Image
                src="/images/about/culture.jpg"
                alt="A bank employee assisting a customer with a QR code payment"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-10 lg:h-[394px] lg:w-[310px] lg:shrink-0 xl:justify-between">
              <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 leading-[1.2] lg:leading-[1.32]">
                Behind every milestone is a team dedicated to serving customers,
                supporting communities, and delivering exceptional banking
                experiences across Nepal.
              </p>
              <Link href="#" className="w-full lg:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
                >
                  View Our History
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
