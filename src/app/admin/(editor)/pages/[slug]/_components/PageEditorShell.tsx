'use client';

import type { ReactNode } from 'react';

import EditorSidebar from './EditorSidebar';
import PageEditorHeader from './PageEditorHeader';
import LivePreview from './LivePreview';
import { PageEditorProvider } from './PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';

type PageEditorShellProps = {
  slug: string;
  children: ReactNode;
};

export default function PageEditorShell({
  slug,
  children,
}: PageEditorShellProps) {
  const { data: page, isPending, isError } = usePage(slug);

  return (
    <PageEditorProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-blue-50">
        <PageEditorHeader
          pageName={page?.title ?? (isPending ? 'Loading…' : 'Page')}
          domainLabel="everestbankltd.com"
          domainHref={`https://everestbankltd.com${page?.path ?? ''}`}
        />
        <div className="flex min-h-0 flex-1">
          <EditorSidebar
            activeSlug={slug}
            page={page}
            isPending={isPending}
            isError={isError}
          />
          <main className="flex min-h-0 min-w-0 flex-1 gap-4 p-4">
            <div className="min-w-0 flex-1 overflow-y-auto">{children}</div>
            <div className="hidden min-h-0 min-w-0 flex-1 xl:block">
              <LivePreview />
            </div>
          </main>
        </div>
      </div>
    </PageEditorProvider>
  );
}
