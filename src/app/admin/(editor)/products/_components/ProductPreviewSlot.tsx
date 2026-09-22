'use client';

import ProductPagePreview from './ProductPagePreview';
import SavingPagePreview from './SavingPagePreview';
import ContentPagePreview from './ContentPagePreview';
import CardPagePreview from './CardPagePreview';
import LivePreview from '../../pages/[slug]/_components/LivePreview';
import { usePageEditor } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';

type ProductPreviewSlotProps = {
  slug?: string;
};

export default function ProductPreviewSlot({ slug }: ProductPreviewSlotProps) {
  const { previewSlug } = usePageEditor();

  const activeSlug = slug || previewSlug;

  return (
    <LivePreview emptyMessage="No page replicated to show live preview yet.">
      {activeSlug ? <ProductPreview slug={activeSlug} /> : null}
    </LivePreview>
  );
}

function ProductPreview({ slug }: { slug: string }) {
  const { data: page } = usePage(slug);

  const sectionTypes = page?.sections?.map((section) => section.section_type);

  if (sectionTypes?.some((type) => type.startsWith('saving_'))) {
    return <SavingPagePreview slug={slug} />;
  }

  if (sectionTypes?.some((type) => type.startsWith('card'))) {
    return <CardPagePreview slug={slug} />;
  }

  if (
    sectionTypes?.some(
      (type) => type.startsWith('content_') && type !== 'content_breadcrumbs',
    )
  ) {
    return <ContentPagePreview slug={slug} />;
  }

  return <ProductPagePreview slug={slug} />;
}
