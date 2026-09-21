import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import ContentQuote from '@/components/shared/content/ContentQuote';
import DirectorCardList from './directors/DirectorCardList';

import { getSectionContent } from '@/lib/get-section-content';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { AboutBoardOfDirectorsPageSection } from '@/api/services/about/about-board-of-directors-page.service';
import type { Director } from '../_data/directors';
import type { FooterSocialLink } from '@/types';

const DEFAULT_QUOTE =
  '“Consistent, strong and dependable: दिगो, दरिलो, विश्वासिलो.”';

type BoardOfDirectorsContentSectionProps = {
  sections?: AboutBoardOfDirectorsPageSection[];
  relatedPages?: ContentSidebarLink[];
  socialLinks?: FooterSocialLink[];
  activeDirectorId?: string;
};

export default function BoardOfDirectorsContentSection({
  sections,
  relatedPages,
  socialLinks,
  activeDirectorId,
}: BoardOfDirectorsContentSectionProps) {
  const peopleContent = getSectionContent(sections, 'content_people');
  const bodyContent = getSectionContent(sections, 'content_body');

  const directors: Director[] = (peopleContent?.people ?? []).map((person) => ({
    id: person.id,
    name: person.name,
    title: person.title,
    image: person.image?.src ?? null,
    position: person.position,
  }));

  const quoteBlock = bodyContent?.blocks.find(
    (block) => block.type === 'quote',
  );

  const links = relatedPages ?? [];

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            <DirectorCardList
              directors={directors}
              activeDirectorId={activeDirectorId}
            />

            <ContentQuote title={quoteBlock?.title || DEFAULT_QUOTE} />
          </article>

          <ContentSidebar links={links} socialLinks={socialLinks} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
