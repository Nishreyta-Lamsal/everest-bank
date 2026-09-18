'use client';

import { createContext, useContext, type ReactNode } from 'react';

const PreviewFrameContext = createContext(false);

export function PreviewFrameProvider({ children }: { children: ReactNode }) {
  return (
    <PreviewFrameContext.Provider value={true}>
      {children}
    </PreviewFrameContext.Provider>
  );
}

export function useIsPreviewFrame() {
  return useContext(PreviewFrameContext);
}
