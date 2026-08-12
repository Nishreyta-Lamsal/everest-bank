import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, PlusIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { csrCards, csrCustomerAvatars } from '../_data';

export default function CsrSection() {
  return (
    <section className="w-full pt-30 pb-15">
      <LayoutWrapper>
        <div className="flex items-start gap-12">
          <div className="flex w-107.25 shrink-0 flex-col items-start gap-12 py-6">
            <p className="font-heading text-heading-h1-desktop-md text-grey-500 w-106.25">
              Creating positive change beyond banking for a better tomorrow
            </p>
            <div className="flex flex-col items-start gap-6">
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
                        ? 'size-15 shrink-0 rounded-full'
                        : 'size-15 shrink-0 -ml-6 rounded-full'
                    }
                  />
                ))}
                <div className="bg-cream-50 text-grey-200 -ml-6 flex size-15 shrink-0 items-center justify-center rounded-full">
                  <PlusIcon className="size-3.5" />
                </div>
              </div>
              <p className="font-heading text-heading-h4-desktop text-grey-400">
                100K+ Customers
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start gap-12">
            <div className="flex w-full items-start gap-12">
              <div className="relative h-71.25 w-107.25 shrink-0 overflow-hidden rounded-3xl rounded-tl-65">
                <Image
                  src="/images/csr/csr-photo.jpg"
                  alt="A barista helping a customer pay with a QR code"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex w-77.5 shrink-0 flex-col items-start gap-12">
                <p className="text-body-2-desktop text-grey-400">
                  Explore how Everest Bank contributes to communities through
                  education, sustainability, and social development
                  initiatives.
                </p>
                <Link href="#">
                  <Button variant="secondary" size="md">
                    Explore CSR activities
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex w-full items-start gap-12">
              {csrCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-grey-bluish-grey flex h-71.25 flex-1 flex-col justify-between rounded-lg p-6"
                >
                  <div className="flex flex-col items-start gap-4">
                    <card.icon className="text-orange-500 size-12" />
                    <p className="font-heading text-heading-h3-desktop text-grey-500 w-56.75">
                      {card.title}
                    </p>
                  </div>
                  <Link
                    href={card.href}
                    className="text-red-700 inline-flex items-center gap-1 text-body-4-desktop-md font-medium"
                  >
                    {card.linkLabel}
                    <ArrowUpRightIcon className="size-4 shrink-0" />
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
