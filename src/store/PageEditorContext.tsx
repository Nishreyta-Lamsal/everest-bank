'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { pageSectionService } from '@/api/services/admin/page-section.service';
import { pageQueryKey } from '@/hooks/api/admin/use-pages';

import type { BulkUpdatePageSectionItem } from '@/api/services/admin/page-section.service';

/** Unsaved section content, keyed by section id. Cleared once published. */
type DraftContentMap = Record<number, Record<string, unknown>>;
type SectionDraft = {
  slug: string;
  item: BulkUpdatePageSectionItem;
};

type PageEditorContextValue = {

  previewSlug: string;
  setPreviewSlug: (slug: string) => void;

  focusedSectionType: string;
  setFocusedSectionType: (sectionType: string) => void;
  registerSectionDraft: (sectionId: number, draft: SectionDraft | null) => void;
  publish: () => Promise<void>;
  isPublishing: boolean;
  canPublish: boolean;
  publishError: unknown;
  drafts: DraftContentMap;
  setDraftContent: (
    sectionId: number,
    content: Record<string, unknown>,
  ) => void;
  draftVisibility: Record<number, boolean>;
  setDraftVisibility: (sectionId: number, isVisible: boolean) => void;
};

const PageEditorContext = createContext<PageEditorContextValue | null>(null);

export function PageEditorProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draftsRef = useRef<Map<number, SectionDraft>>(new Map());
  const [previewSlug, setPreviewSlug] = useState('');
  const [focusedSectionType, setFocusedSectionType] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [canPublish, setCanPublish] = useState(false);
  const [publishError, setPublishError] = useState<unknown>(null);
  const [drafts, setDrafts] = useState<DraftContentMap>({});
  const [draftVisibility, setDraftVisibilityMap] = useState<
    Record<number, boolean>
  >({});

  function registerSectionDraft(sectionId: number, draft: SectionDraft | null) {
    if (draft) {
      draftsRef.current.set(sectionId, draft);
    } else {
      draftsRef.current.delete(sectionId);
    }

    setCanPublish((current) => {
      const next = draftsRef.current.size > 0;

      return current === next ? current : next;
    });
  }

  function setDraftContent(
    sectionId: number,
    content: Record<string, unknown>,
  ) {
    setDrafts((current) => ({ ...current, [sectionId]: content }));
  }

  function setDraftVisibility(sectionId: number, isVisible: boolean) {
    setDraftVisibilityMap((current) => ({
      ...current,
      [sectionId]: isVisible,
    }));
  }

  async function publish() {
    const sectionDrafts = [...draftsRef.current.values()];

    if (sectionDrafts.length === 0) return;

    const bySlug = new Map<string, BulkUpdatePageSectionItem[]>();

    for (const draft of sectionDrafts) {
      const items = bySlug.get(draft.slug) ?? [];

      items.push(draft.item);
      bySlug.set(draft.slug, items);
    }

    setIsPublishing(true);
    setPublishError(null);
    try {
      for (const [slug, items] of bySlug) {
        await pageSectionService.bulkUpdate(slug, items);
      }

      await Promise.all(
        [...bySlug.keys()].map((slug) =>
          queryClient.invalidateQueries({ queryKey: pageQueryKey(slug) }),
        ),
      );

      // Saved content now comes back from the server, so local drafts would
      // only shadow it with the same values.
      setDrafts({});
      setDraftVisibilityMap({});

      router.refresh();
    } catch (error) {
      setPublishError(error);
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <PageEditorContext.Provider
      value={{
        previewSlug,
        setPreviewSlug,
        focusedSectionType,
        setFocusedSectionType,
        registerSectionDraft,
        publish,
        isPublishing,
        canPublish,
        publishError,
        drafts,
        setDraftContent,
        draftVisibility,
        setDraftVisibility,
      }}
    >
      {children}
    </PageEditorContext.Provider>
  );
}

export function usePageEditor() {
  const context = useContext(PageEditorContext);

  if (!context) {
    throw new Error('usePageEditor must be used within a PageEditorProvider');
  }

  return context;
}
