import AboutLinkList from './AboutLinkList';

import { getSectionContent } from '@/lib/get-section-content';

import { aboutLinkCards } from '../../_data';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutLinksSectionProps = {
  sections?: AboutPageSection[];
};

export default function AboutLinksSection({
  sections,
}: AboutLinksSectionProps) {
  const content = getSectionContent(sections, 'about_links');

  const cards =
    content?.cards.map((card) => ({
      title: card.title,
      href: card.href,
      image: card.image?.src || '/placeholder.png',
      imageAlt: card.image?.alt || card.title,
    })) || aboutLinkCards;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:pt-[120px] lg:pb-[60px]">
      <AboutLinkList cards={cards} />
    </section>
  );
}
