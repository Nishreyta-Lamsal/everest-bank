import type { ReactNode } from 'react';

type FieldLabelProps = {
  label: string;
  children: ReactNode;
};

export default function FieldLabel({ label, children }: FieldLabelProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
        {label}
      </p>
      {children}
    </div>
  );
}
