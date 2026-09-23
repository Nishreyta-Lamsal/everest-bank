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
  const bodyContent = getSectionContent(sections, 'content_editor');

  const html = bodyContent?.body;

  // Legacy shape from before this section moved to a single rich-text body;
  // still rendered so pages that haven't been re-saved yet keep working.
  const apiBlocks: ProfileBodyBlock[] = html
    ? []
    : (bodyContent?.blocks?.flatMap((block): ProfileBodyBlock[] => {
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
      }) ?? []);

  const blocks = apiBlocks.length ? apiBlocks : profileBodyBlocks;

  const links = relatedPages ?? [];

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            {html ? (
              <div
                className="text-body-3-mobile lg:text-body-2-desktop text-grey-500 [&_blockquote]:border-grey-200 [&_h1]:font-heading [&_h1]:text-title-0-mobile-md [&_h1]:text-grey-500 [&_h2]:font-heading [&_h2]:text-title-0-mobile-md [&_h2]:text-grey-500 [&_h3]:font-heading [&_h3]:text-title-0-mobile-md [&_h3]:text-grey-500 lg:[&_h1]:text-heading-h4-desktop-md lg:[&_h2]:text-heading-h4-desktop-md lg:[&_h3]:text-heading-h4-desktop-md flex w-full flex-col gap-4 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_img]:w-full [&_img]:rounded-lg [&_img]:object-cover [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              blocks.map((block, index) => (
                <ProfileBodyBlock
                  key={
                    block.type === 'images' ? `images-${index}` : block.heading
                  }
                  block={block}
                />
              ))
            )}
          </article>

          <ContentSidebar links={links} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
