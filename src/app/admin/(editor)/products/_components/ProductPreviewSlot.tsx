'use client';

import type { ReactNode } from 'react';

import ProductPagePreview from './ProductPagePreview';
import LivePreview from '../../pages/[slug]/_components/LivePreview';
import { usePageEditor } from '@/store/PageEditorContext';

type ProductPreviewSlotProps = {
  slug?: string;
  /** Shown until a product exists to preview, so the panel is never empty. */
  fallback: ReactNode;
};

export default function ProductPreviewSlot({
  slug,
  fallback,
}: ProductPreviewSlotProps) {
  const { previewSlug } = usePageEditor();

  const activeSlug = slug || previewSlug;

  return (
    <LivePreview>
      {activeSlug ? <ProductPagePreview slug={activeSlug} /> : fallback}
    </LivePreview>
  );
}
