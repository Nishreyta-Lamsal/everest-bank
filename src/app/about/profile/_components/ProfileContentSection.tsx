import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ProfileBodyBlock from './ProfileBodyBlock';
import ContentSidebar from '@/components/shared/content/ContentSidebar';

import { getSectionContent } from '@/lib/get-section-content';

import { profileBodyBlocks } from '../_data/body-blocks';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { AboutProfilePageSection } from '@/api/services/about/about-profile-page.service';

type ProfileTextBlock = {
  type?: undefined;
  heading: string;
  paragraphs: string[];
};

type ProfileImagesBlock = {
  type: 'images';
  layout?: 'full_width';
  images: {
    src: string;
    alt: string;
  }[];
};

export type ProfileBodyBlock = ProfileTextBlock | ProfileImagesBlock;

type ProfileContentSectionProps = {
  sections?: AboutProfilePageSection[];
  relatedPages?: ContentSidebarLink[];
};

export default function ProfileContentSection({
  sections,
  relatedPages,
}: ProfileContentSectionProps) {
  const bodyContent = getSectionContent(sections, 'content_body');

  const apiBlocks: ProfileBodyBlock[] =
    bodyContent?.blocks?.flatMap((block): ProfileBodyBlock[] => {
      if (block?.type === 'images') {
        const images =
          block.images
            ?.filter((image) => Boolean(image?.src))
            .map((image) => ({ src: image.src, alt: image.alt ?? '' })) ?? [];

        return images.length
          ? [{ type: 'images' as const, layout: block.layout, images }]
          : [];
      }

      const paragraphs =
        block?.paragraphs?.filter((paragraph) => Boolean(paragraph)) ?? [];

      return block?.heading || paragraphs.length
        ? [{ heading: block.heading ?? '', paragraphs }]
        : [];
    }) ?? [];

  const blocks = apiBlocks.length ? apiBlocks : profileBodyBlocks;

  const links = relatedPages ?? [];

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            {blocks.map((block, index) => (
              <ProfileBodyBlock
                key={
                  block.type === 'images' ? `images-${index}` : block.heading
                }
                block={block}
              />
            ))}
          </article>

          <ContentSidebar links={links} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
