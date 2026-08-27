import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CustomerAvatarStack from '@/components/shared/CustomerAvatarStack';
import Button from '@/components/ui/buttons/Button';
import IconLinkCard from '@/components/ui/cards/IconLinkCard';
import { ShieldCheckBadgeIcon } from '@/components/icons';

import type { PersonalPageSection } from '@/api/services/personal/personal-page.service';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';
import { csrCards, csrCustomerAvatars } from '../_data';

type CsrSectionProps = {
  sections?: PersonalPageSection[];
};

export default function CsrSection({ sections }: CsrSectionProps) {
  const content = getSectionContent(sections, 'csr');

  const heading =
    content?.heading ||
    'Creating positive change beyond banking for a better tomorrow';
  const customerAvatars =
    content?.customer_avatars.map((avatar) => avatar.src) || csrCustomerAvatars;
  const customerCountLabel = content?.customer_count || '100K+ Customers';
  const mainImageSrc = content?.main_image?.src || '/images/csr/csr-photo.jpg';
  const mainImageAlt =
    content?.main_image?.alt ||
    'A barista helping a customer pay with a QR code';
  const description =
    content?.description ||
    'Explore how Everest Bank contributes to communities through education, sustainability, and social development initiatives.';
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'Explore CSR activities';
  const cards =
    content?.cards.map((card) => ({
      icon: iconMap[card.icon] ?? ShieldCheckBadgeIcon,
      title: card.title,
      linkLabel: card.link_label,
      href: card.href,
    })) || csrCards;

  return (
    <section className="w-full py-16 xl:pt-30 xl:pb-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
          <div className="flex flex-col gap-10 xl:w-[429px] xl:shrink-0 xl:gap-12 xl:py-6">
            <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 xl:text-heading-h2-desktop-md w-full xl:w-[425px]">
              {heading}
            </h2>
            <CustomerAvatarStack
              avatars={customerAvatars}
              countLabel={customerCountLabel}
              className="xl:flex"
            />
          </div>
          <div className="flex flex-1 flex-col gap-10 xl:gap-12">
            <div className="flex flex-col gap-8 xl:w-full xl:flex-row xl:items-start xl:gap-12">
              <div className="relative h-[237px] w-full overflow-hidden rounded-3xl md:h-[285px] xl:w-[429px] xl:shrink-0 xl:rounded-tl-[260px]">
                <Image
                  src={mainImageSrc}
                  alt={mainImageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 xl:w-[310px] xl:shrink-0 xl:gap-12">
                <p className="text-body-1-mobile xl:text-body-2-desktop text-grey-400">
                  {description}
                </p>
                <Link
                  href={ctaHref}
                  className="block w-full xl:inline-block xl:w-auto"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full xl:w-auto"
                  >
                    {ctaLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 xl:w-full xl:flex-row xl:gap-12">
              {cards.map((card) => (
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
