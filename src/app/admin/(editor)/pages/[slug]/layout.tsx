import type { ReactNode } from 'react';

import PageEditorShell from './_components/PageEditorShell';

type PageEditorLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function PageEditorLayout({
  children,
  params,
}: PageEditorLayoutProps) {
  const { slug } = await params;

  return <PageEditorShell slug={slug}>{children}</PageEditorShell>;
}
