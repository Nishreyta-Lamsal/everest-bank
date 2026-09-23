'use client';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';

type ListPaginationProps = {
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
};

export default function ListPagination({
  page,
  pageSize,
  count,
  onPageChange,
}: ListPaginationProps) {
  const totalPages = Math.ceil(count / pageSize);

  if (totalPages <= 1) return null;

  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, count);

  return (
    <div className="flex items-center justify-between gap-2 border-t border-black/5 px-4 pt-3">
      <p className="text-[13px] text-neutral-700/68">
        {first}–{last} of {count}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <icon.arrowLeft className="size-4" />
          Previous
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <icon.arrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
