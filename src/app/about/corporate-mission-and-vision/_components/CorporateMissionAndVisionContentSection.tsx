import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CorporateMissionAndVisionBodyBlock from './CorporateMissionAndVisionBodyBlock';
import ContentSidebar from '@/components/shared/content/ContentSidebar';

import { getSectionContent } from '@/lib/get-section-content';

import { corporateMissionAndVisionBodyBlocks } from '../_data/body-blocks';

import { socialIconMap } from '@/constants';
import { socialLinks } from '@/data';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { AboutCorporateMissionAndVisionPageSection } from '@/api/services/about/about-corporate-mission-and-vision-page.service';
import type { FooterSocialLink } from '@/types';

type ContentTextBlock = {
  type?: undefined;
  heading: string;
  paragraphs: string[];
};

type ContentImagesBlock = {
  type: 'images';
  layout?: 'full_width';
  images: {
    src: string;
    alt: string;
  }[];
};

type ContentCardBlock = {
  type: 'card';
  icon: string;
  heading: string;
  paragraphs: string[];
};

type ContentQuoteBlock = {
  type: 'quote';
  title: string;
};

export type CorporateMissionAndVisionBodyBlock =
  ContentTextBlock | ContentImagesBlock | ContentCardBlock | ContentQuoteBlock;

type CorporateMissionAndVisionContentSectionProps = {
  sections?: AboutCorporateMissionAndVisionPageSection[];
  relatedPages?: ContentSidebarLink[];
};

export default function CorporateMissionAndVisionContentSection({
  sections,
  relatedPages,
}: CorporateMissionAndVisionContentSectionProps) {
  const bodyContent = getSectionContent(sections, 'content_body');
  const sidebarContent = getSectionContent(sections, 'content_sidebar');

  const apiBlocks: CorporateMissionAndVisionBodyBlock[] =
    bodyContent?.blocks?.flatMap(
      (block): CorporateMissionAndVisionBodyBlock[] => {
        if (block?.type === 'images') {
          const images =
            block.images
              ?.filter((image) => Boolean(image?.src))
              .map((image) => ({ src: image.src, alt: image.alt ?? '' })) ?? [];

          return images.length
            ? [{ type: 'images' as const, layout: block.layout, images }]
            : [];
        }

        if (block?.type === 'card') {
          const paragraphs =
            block.paragraphs?.filter((paragraph) => Boolean(paragraph)) ?? [];

          return block.heading || paragraphs.length
            ? [
                {
                  type: 'card' as const,
                  icon: block.icon ?? '',
                  heading: block.heading ?? '',
                  paragraphs,
                },
              ]
            : [];
        }

        if (block?.type === 'quote') {
          return block.title
            ? [{ type: 'quote' as const, title: block.title }]
            : [];
        }

        const paragraphs =
          block?.paragraphs?.filter((paragraph) => Boolean(paragraph)) ?? [];

        return block?.heading || paragraphs.length
          ? [{ heading: block.heading ?? '', paragraphs }]
          : [];
      },
    ) ?? [];

  const blocks = apiBlocks.length
    ? apiBlocks
    : corporateMissionAndVisionBodyBlocks;

  const links = relatedPages ?? [];

  const apiSocialLinks: FooterSocialLink[] =
    sidebarContent?.social_links?.flatMap((link) => {
      const Icon = link?.slug ? socialIconMap[link.slug] : undefined;

      return Icon && link.href
        ? [{ label: link.label ?? link.slug, href: link.href, icon: Icon }]
        : [];
    }) ?? [];

  const sidebarSocialLinks = apiSocialLinks.length
    ? apiSocialLinks
    : socialLinks;

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            {blocks.map((block, index) => (
              <CorporateMissionAndVisionBodyBlock
                key={
                  block.type === 'images' || block.type === 'quote'
                    ? `${block.type}-${index}`
                    : block.heading
                }
                block={block}
              />
            ))}
          </article>

          <ContentSidebar links={links} socialLinks={sidebarSocialLinks} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
