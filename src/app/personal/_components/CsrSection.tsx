import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, PlusIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { csrCards, csrCustomerAvatars } from '../_data';

export default function CsrSection() {
  return (
    <section className="w-full py-16 xl:pt-30 xl:pb-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
          <div className="flex flex-col gap-10 xl:w-[429px] xl:shrink-0 xl:gap-12 xl:py-6">
            <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h2-desktop-md w-full xl:w-[425px]">
              Creating positive change beyond banking for a better tomorrow
            </h2>
            <div className="hidden flex-col items-start gap-6 xl:flex">
              <div className="flex items-start">
                {csrCustomerAvatars.map((avatar, index) => (
                  <Image
                    key={avatar}
                    src={avatar}
                    alt=""
                    width={60}
                    height={60}
                    className={
                      index === 0
                        ? 'size-[60px] shrink-0 rounded-full'
                        : '-ml-6 size-[60px] shrink-0 rounded-full'
                    }
                  />
                ))}
                <div className="bg-cream-50 text-grey-200 -ml-6 flex size-[60px] shrink-0 items-center justify-center rounded-full">
                  <PlusIcon className="size-[14px]" />
                </div>
              </div>
              <p className="font-heading text-heading-h4-desktop text-grey-400">
                100K+ Customers
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-10 xl:gap-12">
            <div className="flex flex-col gap-10 xl:w-full xl:flex-row xl:items-start xl:gap-12">
              <div className="rounded-tl-65 relative h-[237px] w-full overflow-hidden rounded-3xl md:h-[285px] xl:w-[429px] xl:shrink-0">
                <Image
                  src="/images/csr/csr-photo.jpg"
                  alt="A barista helping a customer pay with a QR code"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 xl:w-[310px] xl:shrink-0 xl:gap-12">
                <p className="text-body-2-desktop text-grey-400">
                  Explore how Everest Bank contributes to communities through
                  education, sustainability, and social development initiatives.
                </p>
                <Link
                  href="#"
                  className="block w-full xl:inline-block xl:w-auto"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full xl:w-auto"
                  >
                    Explore CSR activities
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 xl:w-full xl:flex-row xl:gap-12">
              {csrCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-grey-bluish-grey flex w-full flex-col items-end gap-6 rounded-lg p-4 xl:h-[285px] xl:flex-1 xl:items-start xl:justify-between xl:gap-0 xl:p-6"
                >
                  <div className="flex w-full items-center gap-2 xl:flex-col xl:items-start xl:gap-4">
                    <card.icon className="size-[32px] shrink-0 text-orange-500 xl:size-[48px]" />
                    <h3 className="font-heading text-heading-h3-mobile text-grey-500 xl:text-heading-h3-desktop w-[227px]">
                      {card.title}
                    </h3>
                  </div>
                  <Link
                    href={card.href}
                    className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700"
                  >
                    {card.linkLabel}
                    <ArrowUpRightIcon className="size-[16px] shrink-0" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
