'use client';

import { useSearchParams } from 'next/navigation';

import { icon } from '@/components/admin/icons';
import PageSectionTree from './PageSectionTree';
import SidebarPageLink from './SidebarPageLink';

import { usePages } from '@/hooks/api/admin/use-pages';

import type { PageDetail } from '@/types/admin';

type EditorSidebarProps = {
  activeSlug: string;
  page?: PageDetail;
  isPending: boolean;
  isError: boolean;
};

export default function EditorSidebar({
  activeSlug,
  page,
  isPending,
  isError,
}: EditorSidebarProps) {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  const requestedSectionId = sectionParam ? Number(sectionParam) : undefined;

  const fallbackSectionId = page?.sections?.length
    ? [...page.sections].sort((a, b) => a.position - b.position)[0].id
    : undefined;
  const activeSectionId = requestedSectionId ?? fallbackSectionId;

  const { data } = usePages();
  const otherPages = (data?.pages ?? []).filter(
    (entry) => entry.slug !== activeSlug,
  );

  return (
    <aside className="bg-white-alpha-80 sticky top-15 flex h-[calc(100vh-60px)] w-[230px] shrink-0 flex-col gap-4.5 overflow-y-auto px-4 py-3 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-3 py-0.5">
        <p className="text-[12px] text-neutral-900 opacity-[0.72]">Pages</p>
        <icon.chevronDown className="size-4 rotate-180 text-neutral-600" />
      </div>
      <div className="flex w-full flex-col items-center gap-1">
        {isPending && (
          <div className="flex w-full flex-col gap-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[32px] w-full animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="w-full px-3 py-2 text-[12px] text-neutral-700/68">
            Could not load this page.
          </p>
        )}

        {page && (
          <>
            <p className="w-full truncate rounded-lg bg-slate-100 px-3 py-2 text-[14px] font-medium text-neutral-900">
              {page.title}
            </p>
            <PageSectionTree
              slug={activeSlug}
              sections={page.sections}
              activeSectionId={activeSectionId}
            />
          </>
        )}

        {otherPages.map((entry) => (
          <SidebarPageLink key={entry.id} page={entry} />
        ))}
      </div>
    </aside>
  );
}
