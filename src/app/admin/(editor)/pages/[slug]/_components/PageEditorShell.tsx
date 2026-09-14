'use client';

import type { ReactNode } from 'react';

import EditorSidebar from './EditorSidebar';
import PageEditorHeader from './PageEditorHeader';
import LivePreview from './LivePreview';
import { PageEditorProvider } from '@/store/PageEditorContext';

import { usePage } from '@/hooks/api/admin/use-pages';

type PageEditorShellProps = {
  slug: string;
  preview: ReactNode;
  children: ReactNode;
};

export default function PageEditorShell({
  slug,
  preview,
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
            <div className="min-w-0 flex-2 overflow-y-auto">{children}</div>
            <div className="hidden min-h-0 w-[600px] shrink-0 xl:block">
              <LivePreview>{preview}</LivePreview>
            </div>
          </main>
        </div>
      </div>
    </PageEditorProvider>
  );
}
