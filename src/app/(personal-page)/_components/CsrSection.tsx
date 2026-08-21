import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CustomerAvatarStack from '@/components/shared/CustomerAvatarStack';
import Button from '@/components/ui/buttons/Button';
import IconLinkCard from '@/components/ui/cards/IconLinkCard';

import { csrCards, csrCustomerAvatars } from '../_data';

export default function CsrSection() {
  return (
    <section className="w-full py-16 xl:pt-30 xl:pb-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
          <div className="flex flex-col gap-10 xl:w-[429px] xl:shrink-0 xl:gap-12 xl:py-6">
            <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 xl:text-heading-h2-desktop-md w-full xl:w-[425px]">
              Creating positive change beyond banking for a better tomorrow
            </h2>
            <CustomerAvatarStack
              avatars={csrCustomerAvatars}
              countLabel="100K+ Customers"
              className="xl:flex"
            />
          </div>
          <div className="flex flex-1 flex-col gap-10 xl:gap-12">
            <div className="flex flex-col gap-8 xl:w-full xl:flex-row xl:items-start xl:gap-12">
              <div className="relative h-[237px] w-full overflow-hidden rounded-3xl md:h-[285px] xl:w-[429px] xl:shrink-0 xl:rounded-tl-[260px]">
                <Image
                  src="/images/csr/csr-photo.jpg"
                  alt="A barista helping a customer pay with a QR code"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 xl:w-[310px] xl:shrink-0 xl:gap-12">
                <p className="text-body-1-mobile xl:text-body-2-desktop text-grey-400">
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
                <IconLinkCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  linkLabel={card.linkLabel}
                  href={card.href}
                  className="xl:h-[285px] xl:flex-1"
                />
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
