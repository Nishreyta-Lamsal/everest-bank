import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FeatureCard from '@/components/shared/FeatureCard';
import { icon } from '@/components/icons';

import { getSectionContent } from '@/lib/get-section-content';
import { toIconKey } from '@/lib/utils';

import { bottomProductCards, topProductCards } from '../_data';

import type { PersonalPageSection } from '@/api/services/personal/personal-page.service';
import type { ComponentType, SVGProps } from 'react';

type ProductsSectionProps = {
  sections?: PersonalPageSection[];
};

function resolveIcon(slug: string) {
  return (
    (icon as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[
      toIconKey(slug)
    ] ?? icon.bank
  );
}

export default function ProductsSection({ sections }: ProductsSectionProps) {
  const content = getSectionContent(sections, 'products');

  const topCards = content?.top_cards.length
    ? content.top_cards.map((card) => ({
        title: card.title,
        subtitle: card.subtitle,
        href: card.href,
        icon: resolveIcon(card.icon),
        featured: card.featured,
        decorationSrc: card.decoration_src?.src,
      }))
    : topProductCards.map((card, index) => ({
        ...card,
        featured: index === 0,
        decorationSrc: '/images/products/open-account-money-bag-v1.png',
      }));

  const bottomCards = content?.bottom_cards.length
    ? content.bottom_cards.map((card) => ({
        title: card.title,
        subtitle: card.subtitle,
        href: card.href,
        icon: resolveIcon(card.icon),
      }))
    : bottomProductCards;

  return (
    <section className="w-full py-16 xl:pt-22">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-4 xl:gap-6">
          <div className="grid w-full grid-cols-2 gap-4 xl:flex xl:items-center xl:gap-6">
            {topCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-4 xl:flex xl:items-center xl:gap-6">
            {bottomCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
