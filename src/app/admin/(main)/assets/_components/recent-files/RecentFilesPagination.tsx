'use client';

import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

type RecentFilesPaginationProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

/**
 * Prev/next only: the list endpoint is cursor-paginated and returns no total,
 * so there are no page numbers to show.
 */
export default function RecentFilesPagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: RecentFilesPaginationProps) {
  if (!hasPrevious && !hasNext) return null;

  return (
    <div className="flex items-center justify-end gap-2 border-t border-black/5 px-4 py-3">
      <Button
        type="button"
        variant="secondary"
        size="small"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        <icon.arrowLeft className="size-4" />
        Previous
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="small"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
        <icon.arrowRight className="size-4" />
      </Button>
    </div>
  );
}
