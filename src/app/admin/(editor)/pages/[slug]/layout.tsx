import type { ReactNode } from 'react';

import PageEditorShell from './_components/PageEditorShell';
import PersonalPagePreview from './_components/PersonalPagePreview';
import BusinessPagePreview from './_components/BusinessPagePreview';
import AboutPagePreview from './_components/AboutPagePreview';
import RemittancePagePreview from './_components/RemittancePagePreview';
import ProfilePagePreview from './_components/ProfilePagePreview';

import { PAGE_PREVIEW_COMPONENTS } from './_data/page-preview-components';

import type { ComponentType } from 'react';

/**
 * Pages whose preview re-renders from unsaved edits rather than saved data.
 * Every other slug falls back to the static server-rendered preview.
 */
const LIVE_PREVIEW_COMPONENTS: Record<
  string,
  ComponentType<{ slug: string }>
> = {
  personal: PersonalPagePreview,
  business: BusinessPagePreview,
  about: AboutPagePreview,
  remittance: RemittancePagePreview,
  profile: ProfilePagePreview,
};

type PageEditorLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function PageEditorLayout({
  children,
  params,
}: PageEditorLayoutProps) {
  const { slug } = await params;

  const LivePreviewComponent = LIVE_PREVIEW_COMPONENTS[slug];
  const PreviewComponent = PAGE_PREVIEW_COMPONENTS[slug];

  const preview = LivePreviewComponent ? (
    <LivePreviewComponent slug={slug} />
  ) : PreviewComponent ? (
    <PreviewComponent />
  ) : null;

  return (
    <PageEditorShell slug={slug} preview={preview}>
      {children}
    </PageEditorShell>
  );
}
