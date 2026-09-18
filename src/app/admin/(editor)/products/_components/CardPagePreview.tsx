'use client';

import Breadcrumbs from '@/components/ui/navigation/Breadcrumbs';
import ContentHeroSection from '@/components/shared/content/ContentHeroSection';
import CardsTrustBarSection from '@/app/(personal-page)/cards/_components/CardsTrustBarSection';
import CardDetailSection from '@/app/(personal-page)/cards/[slug]/_components/CardDetailSection';
import PreviewSectionHighlight from '@/components/admin/shared/PreviewSectionHighlight';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';
import { toPreviewSections } from '@/lib/admin/preview-sections';
import { getSectionContent } from '@/lib/get-section-content';

import type { CardDetailsPageSection } from '@/api/services/personal/card/card-details-page.service';

type CardPagePreviewProps = {
  slug: string;
};

export default function CardPagePreview({ slug }: CardPagePreviewProps) {
  const { drafts, draftVisibility, focusedSectionType } = usePageEditor();
  const { data: page } = usePage(slug);

  const sections = toPreviewSections(
    page?.sections,
    drafts,
    draftVisibility,
  ) as CardDetailsPageSection[] | undefined;

  const breadcrumbs = getSectionContent(sections, 'content_breadcrumbs');
  const breadcrumbItems = breadcrumbs?.items?.length
    ? breadcrumbs.items
    : [{ label: page?.title ?? '' }];

  const hero = getSectionContent(sections, 'card_product_hero');

  return (
    <main className="relative">
      <Breadcrumbs items={breadcrumbItems} />
      {hero && (
        <PreviewSectionHighlight
          sectionType="card_product_hero"
          activeSectionType={focusedSectionType}
        >
          <ContentHeroSection
            image={hero.image?.src || '/images/cards/card-showcase-bg.png'}
            imageAlt={
              hero.image?.alt ||
              'A hand holding an Everest Bank Visa card in front of Kathmandu Durbar Square at sunset'
            }
            heading={hero.heading}
            buttonLabel={hero.button?.label ?? ''}
            buttonHref={hero.button?.href ?? '#'}
          />
        </PreviewSectionHighlight>
      )}
      <PreviewSectionHighlight
        sectionType="cards_trust_bar"
        activeSectionType={focusedSectionType}
      >
        <CardsTrustBarSection sections={sections} />
      </PreviewSectionHighlight>
      <PreviewSectionHighlight
        sectionType="card_overview"
        activeSectionType={focusedSectionType}
      >
        <CardDetailSection sections={sections} />
      </PreviewSectionHighlight>
    </main>
  );
}
