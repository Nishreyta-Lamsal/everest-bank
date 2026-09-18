'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  FooterColumnWrite,
  FooterLinkWrite,
  FooterSettingsWrite,
  FooterSocialLinkWrite,
} from '@/types/admin';

/**
 * Every edit in the footer editor is staged here and written only when the
 * save bar is used, so one Save covers the whole page rather than each row
 * saving on its own.
 */
export type FooterDraft = {
  settings: FooterSettingsWrite;
  /** Keyed by the existing column/link/social slug. */
  columns: Record<string, Partial<FooterColumnWrite>>;
  links: Record<string, Partial<FooterLinkWrite>>;
  socials: Record<string, Partial<FooterSocialLinkWrite>>;
  newColumns: FooterColumnWrite[];
  newLinks: { columnSlug: string; payload: FooterLinkWrite }[];
  newSocials: FooterSocialLinkWrite[];
  removedColumns: string[];
  removedLinks: { columnSlug: string; linkSlug: string }[];
  removedSocials: string[];
};

const EMPTY_DRAFT: FooterDraft = {
  settings: {},
  columns: {},
  links: {},
  socials: {},
  newColumns: [],
  newLinks: [],
  newSocials: [],
  removedColumns: [],
  removedLinks: [],
  removedSocials: [],
};

/** Links are keyed by both slugs, since link slugs repeat across columns. */
export function linkKey(columnSlug: string, linkSlug: string) {
  return `${columnSlug}/${linkSlug}`;
}

type FooterDraftContextValue = {
  draft: FooterDraft;
  update: (apply: (draft: FooterDraft) => FooterDraft) => void;
  reset: () => void;
  hasChanges: boolean;
};

const FooterDraftContext = createContext<FooterDraftContextValue | null>(null);

export function FooterDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<FooterDraft>(EMPTY_DRAFT);

  const update = useCallback(function (
    apply: (current: FooterDraft) => FooterDraft,
  ) {
    setDraft(apply);
  }, []);

  const reset = useCallback(function () {
    setDraft(EMPTY_DRAFT);
  }, []);

  const hasChanges = useMemo(
    function () {
      return (
        Object.keys(draft.settings).length > 0 ||
        Object.keys(draft.columns).length > 0 ||
        Object.keys(draft.links).length > 0 ||
        Object.keys(draft.socials).length > 0 ||
        draft.newColumns.length > 0 ||
        draft.newLinks.length > 0 ||
        draft.newSocials.length > 0 ||
        draft.removedColumns.length > 0 ||
        draft.removedLinks.length > 0 ||
        draft.removedSocials.length > 0
      );
    },
    [draft],
  );

  const value = useMemo(
    function () {
      return { draft, update, reset, hasChanges };
    },
    [draft, update, reset, hasChanges],
  );

  return (
    <FooterDraftContext.Provider value={value}>
      {children}
    </FooterDraftContext.Provider>
  );
}

export function useFooterDraft() {
  const context = useContext(FooterDraftContext);

  if (!context) {
    throw new Error('useFooterDraft must be used inside FooterDraftProvider');
  }

  return context;
}
