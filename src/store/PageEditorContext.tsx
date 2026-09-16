'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

type PublishHandler = () => Promise<void>;

/** Unsaved section content, keyed by section id. Cleared once published. */
type DraftContentMap = Record<number, Record<string, unknown>>;

type PageEditorContextValue = {
  registerPublishHandler: (handler: PublishHandler | null) => void;
  publish: () => Promise<void>;
  isPublishing: boolean;
  canPublish: boolean;
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

  const handlerRef = useRef<PublishHandler | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [canPublish, setCanPublish] = useState(false);
  const [drafts, setDrafts] = useState<DraftContentMap>({});
  const [draftVisibility, setDraftVisibilityMap] = useState<
    Record<number, boolean>
  >({});

  function registerPublishHandler(handler: PublishHandler | null) {
    handlerRef.current = handler;
    setCanPublish(Boolean(handler));
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
    if (!handlerRef.current) return;

    setIsPublishing(true);
    try {
      await handlerRef.current();

      // Saved content now comes back from the server, so local drafts would
      // only shadow it with the same values.
      setDrafts({});
      setDraftVisibilityMap({});

      router.refresh();
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <PageEditorContext.Provider
      value={{
        registerPublishHandler,
        publish,
        isPublishing,
        canPublish,
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
