import type { ReactNode } from 'react';

import PageEditorShell from './_components/PageEditorShell';
import PersonalPagePreview from './_components/PersonalPagePreview';

import { PAGE_PREVIEW_COMPONENTS } from './_data/page-preview-components';

/** Pages whose preview re-renders from unsaved edits rather than saved data. */
const LIVE_PREVIEW_SLUGS = new Set(['personal']);

type PageEditorLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function PageEditorLayout({
  children,
  params,
}: PageEditorLayoutProps) {
  const { slug } = await params;

  const PreviewComponent = PAGE_PREVIEW_COMPONENTS[slug];

  const preview = LIVE_PREVIEW_SLUGS.has(slug) ? (
    <PersonalPagePreview slug={slug} />
  ) : PreviewComponent ? (
    <PreviewComponent />
  ) : null;

  return (
    <PageEditorShell slug={slug} preview={preview}>
      {children}
    </PageEditorShell>
  );
}
