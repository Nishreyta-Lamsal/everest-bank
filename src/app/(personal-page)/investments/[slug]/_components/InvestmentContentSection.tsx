import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import InvestmentBodyBlock from './InvestmentBodyBlock';

import { getSectionContent } from '@/lib/get-section-content';

import { investmentBodyBlocks, relatedPages } from '../_data';

import type { ContentSidebarLink } from '@/components/shared/content/ContentSidebar';
import type { InvestmentPageSection } from '@/api/services/personal/investment-page.service';
import type { InvestmentBodyBlock as InvestmentBodyBlockData } from '../_data';

type InvestmentContentSectionProps = {
  sections?: InvestmentPageSection[];
  relatedPages?: ContentSidebarLink[];
};

export default function InvestmentContentSection({
  sections,
  relatedPages: relatedPagesProp,
}: InvestmentContentSectionProps) {
  const bodyContent = getSectionContent(sections, 'content_editor');
  const sidebarContent = getSectionContent(sections, 'content_sidebar');

  const html = bodyContent?.body;

  // Legacy shape from before this section moved to a single rich-text body;
  // still rendered so pages that haven't been re-saved yet keep working.
  const apiBlocks: InvestmentBodyBlockData[] = html
    ? []
    : (bodyContent?.blocks?.flatMap((block): InvestmentBodyBlockData[] => {
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

  const blocks = apiBlocks.length ? apiBlocks : investmentBodyBlocks;

  const links =
    relatedPagesProp ?? sidebarContent?.related_pages ?? relatedPages;

  return (
    <section className="w-full py-12 lg:py-[88px]">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-[108px]">
          <div className="flex w-full flex-col items-start gap-8 lg:max-w-[751px] lg:gap-[54px]">
            {html ? (
              <div
                className="text-body-3-mobile lg:text-body-2-desktop text-grey-500 [&_blockquote]:border-grey-200 [&_h1]:font-heading [&_h1]:text-title-0-mobile-md [&_h1]:text-grey-500 [&_h2]:font-heading [&_h2]:text-title-0-mobile-md [&_h2]:text-grey-500 [&_h3]:font-heading [&_h3]:text-title-0-mobile-md [&_h3]:text-grey-500 lg:[&_h1]:text-heading-h4-desktop-md lg:[&_h2]:text-heading-h4-desktop-md lg:[&_h3]:text-heading-h4-desktop-md flex w-full flex-col gap-4 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_img]:w-full [&_img]:rounded-lg [&_img]:object-cover [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              blocks.map((block, index) => (
                <InvestmentBodyBlock
                  key={
                    block.type === 'images' ? `images-${index}` : block.heading
                  }
                  block={block}
                />
              ))
            )}
          </div>

          <ContentSidebar links={links} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
