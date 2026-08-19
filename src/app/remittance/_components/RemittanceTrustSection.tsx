import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CustomerAvatarStack from '@/components/shared/CustomerAvatarStack';
import IconLinkCard from '@/components/ui/cards/IconLinkCard';

import {
  remittanceTrustAvatars,
  remittanceTrustCards,
  remittanceTrustImage,
} from '../_data/remittance-trust';

export default function RemittanceTrustSection() {
  return (
    <section className="w-full py-16 lg:pt-30 lg:pb-15">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[429px_1fr] lg:items-start lg:gap-x-12 lg:gap-y-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 w-full max-w-[320px] lg:col-start-1 lg:row-start-1 lg:max-w-[425px]">
            Bringing every rupee into the formal channel
          </h2>
          <div className="relative h-[201px] w-full overflow-hidden rounded-lg rounded-tl-[198px] md:h-[285px] lg:col-start-2 lg:row-start-1 lg:rounded-tl-[260px]">
            <Image
              src={remittanceTrustImage.src}
              alt={remittanceTrustImage.alt}
              fill
              className="object-cover"
            />
          </div>
          <CustomerAvatarStack
            avatars={remittanceTrustAvatars}
            countLabel="100K+ Customers"
            className="flex lg:col-start-1 lg:row-start-2"
            countClassName="text-title-3-mobile uppercase lg:text-title-0-desktop lg:normal-case"
          />
          <div className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2 lg:flex-row lg:gap-12">
            {remittanceTrustCards.map((card) => (
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
