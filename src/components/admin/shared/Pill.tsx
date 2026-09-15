import type { ReactNode } from 'react';

import { icon } from '@/components/admin/icons';

type PillProps = {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
};

export default function Pill({ children, onRemove, removeLabel }: PillProps) {
  return (
    <span className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-950">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel ?? 'Remove'}
          className="cursor-pointer text-slate-600"
        >
          <icon.close className="size-4" />
        </button>
      )}
    </span>
  );
}
