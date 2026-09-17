'use client';

import { useState } from 'react';

type CursorPaginationMode = 'cursor' | 'page';

type UseCursorPaginationOptions = {
  mode?: CursorPaginationMode;
};

/**
 * Paging for endpoints that hand back an opaque `next_cursor` instead of a
 * total. Going forward means keeping the cursor the server just gave us; going
 * back means stepping through the trail of cursors already visited, since a
 * cursor can't be derived or decremented.
 *
 * `mode: 'page'` covers the endpoints that are page-numbered instead (the
 * search index), so a caller can switch between the two without branching on
 * which paging scheme is in play.
 */
export function useCursorPagination({
  mode = 'cursor',
}: UseCursorPaginationOptions = {}) {
  const [pageIndex, setPageIndex] = useState(0);
  // Index 0 is the unparameterised first page, so the trail is never empty.
  const [cursors, setCursors] = useState<(string | undefined)[]>([undefined]);

  function goToNextPage(nextCursor?: string | null) {
    if (mode === 'page') {
      setPageIndex((index) => index + 1);

      return;
    }

    if (!nextCursor) return;

    // Truncate ahead of the current page: stepping back and forward again can
    // yield a different cursor, so anything past here is stale.
    setCursors((current) => [...current.slice(0, pageIndex + 1), nextCursor]);
    setPageIndex((index) => index + 1);
  }

  function goToPreviousPage() {
    setPageIndex((index) => Math.max(0, index - 1));
  }

  function reset() {
    setPageIndex(0);
    setCursors([undefined]);
  }

  return {
    cursor: mode === 'page' ? undefined : cursors[pageIndex],
    page: pageIndex + 1,
    canGoPrevious: pageIndex > 0,
    goToNextPage,
    goToPreviousPage,
    reset,
  };
}
