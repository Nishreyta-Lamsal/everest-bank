import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CustomerAvatarStack from '@/components/shared/CustomerAvatarStack';
import IconLinkCard from '@/components/ui/cards/IconLinkCard';
import { ShieldCheckBadgeIcon } from '@/components/icons';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';
import {
  remittanceTrustAvatars,
  remittanceTrustCards,
  remittanceTrustImage,
} from '../_data/remittance-trust';

import type { RemittancePageSection } from '@/api/services/remittance/remittance-page.service';

type RemittanceTrustSectionProps = {
  sections?: RemittancePageSection[];
};

export default function RemittanceTrustSection({
  sections,
}: RemittanceTrustSectionProps) {
  const content = getSectionContent(sections, 'remittance_trust');

  const heading =
    content?.heading || 'Bringing every rupee into the formal channel';
  const imageSrc = content?.image?.src || remittanceTrustImage.src;
  const imageAlt = content?.image?.alt || remittanceTrustImage.alt;
  const avatars =
    content?.avatars.map((avatar) => avatar.src) || remittanceTrustAvatars;
  const countLabel = content?.count_label || '100K+ Customers';
  const cards =
    content?.cards.map((card) => ({
      icon: iconMap[card.icon] ?? ShieldCheckBadgeIcon,
      title: card.title,
      linkLabel: card.link_label,
      href: card.href,
    })) || remittanceTrustCards;

  return (
    <section className="w-full py-16 lg:pt-30 lg:pb-15">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[429px_1fr] lg:items-start lg:gap-x-12 lg:gap-y-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 w-full max-w-[320px] lg:col-start-1 lg:row-start-1 lg:max-w-[425px]">
            {heading}
          </h2>
          <div className="relative h-[201px] w-full overflow-hidden rounded-lg rounded-tl-[198px] md:h-[285px] lg:col-start-2 lg:row-start-1 lg:rounded-tl-[260px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
          <CustomerAvatarStack
            avatars={avatars}
            countLabel={countLabel}
            className="flex lg:col-start-1 lg:row-start-2"
            countClassName="text-title-3-mobile uppercase lg:text-title-0-desktop lg:normal-case"
          />
          <div className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2 lg:flex-row lg:gap-12">
            {cards.map((card) => (
              <IconLinkCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                linkLabel={card.linkLabel}
                href={card.href}
                className="lg:h-[285px] lg:flex-1"
              />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
