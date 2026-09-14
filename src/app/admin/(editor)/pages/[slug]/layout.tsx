import type { ReactNode } from 'react';

import PageEditorShell from './_components/PageEditorShell';

import { PAGE_PREVIEW_COMPONENTS } from './_data/page-preview-components';

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

  return (
    <PageEditorShell
      slug={slug}
      preview={PreviewComponent ? <PreviewComponent /> : null}
    >
      {children}
    </PageEditorShell>
  );
}
