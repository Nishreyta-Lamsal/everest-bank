import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FinancingContentCard from './FinancingContentCard';
import FinancingMediaCard from './FinancingMediaCard';
import Button from '@/components/ui/buttons/Button';

import { getSectionContent } from '@/lib/get-section-content';

import {
  businessFinancingContentCards,
  businessFinancingMediaCard,
} from '../../_data';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

type BusinessFinancingSectionProps = {
  sections?: BusinessPageSection[];
};

export default function BusinessFinancingSection({
  sections,
}: BusinessFinancingSectionProps) {
  const content = getSectionContent(sections, 'business_financing');

  const heading =
    content?.heading || 'Financing built to support every stage of growth.';
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'Explore financing solutions';
  const mediaCard = content?.media_card
    ? {
        label: content.media_card.label,
        image: content.media_card.image?.src || '/placeholder.png',
        imageAlt: content.media_card.image?.alt || content.media_card.label,
        href: content.media_card.href,
      }
    : businessFinancingMediaCard;
  const contentCards =
    content?.content_cards.map((card) => ({
      title: card.title,
      description: card.description,
      image: card.image?.src || '/placeholder.png',
      imageAlt: card.image?.alt || card.title,
      linkLabel: card.link_label,
      href: card.href,
    })) || businessFinancingContentCards;

  const [workingCapitalCard, tradeFinanceCard] = contentCards;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 xl:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h2-desktop-md lg:w-[490px]">
            {heading}
          </h2>
          <Link href={ctaHref} className="hidden lg:inline-block lg:w-auto">
            <Button variant="secondary" size="lg">
              {ctaLabel}
            </Button>
          </Link>
        </div>
        <div className="mt-10 flex w-full flex-col items-stretch gap-6 lg:flex-row xl:mt-12 xl:gap-10">
          {workingCapitalCard && (
            <FinancingContentCard {...workingCapitalCard} />
          )}
          <FinancingMediaCard {...mediaCard} />
          {tradeFinanceCard && <FinancingContentCard {...tradeFinanceCard} />}
        </div>
        <Link href={ctaHref} className="mt-10 block w-full lg:hidden">
          <Button variant="secondary" size="sm" className="w-full">
            {ctaLabel}
          </Button>
        </Link>
      </LayoutWrapper>
    </section>
  );
}
