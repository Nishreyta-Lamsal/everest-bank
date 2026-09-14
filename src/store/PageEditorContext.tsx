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

type PageEditorContextValue = {
  registerPublishHandler: (handler: PublishHandler | null) => void;
  publish: () => Promise<void>;
  isPublishing: boolean;
  canPublish: boolean;
};

const PageEditorContext = createContext<PageEditorContextValue | null>(null);

export function PageEditorProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handlerRef = useRef<PublishHandler | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [canPublish, setCanPublish] = useState(false);

  function registerPublishHandler(handler: PublishHandler | null) {
    handlerRef.current = handler;
    setCanPublish(Boolean(handler));
  }

  async function publish() {
    if (!handlerRef.current) return;

    setIsPublishing(true);
    try {
      await handlerRef.current();

      router.refresh();
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <PageEditorContext.Provider
      value={{ registerPublishHandler, publish, isPublishing, canPublish }}
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
