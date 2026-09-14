import type { ReactNode } from 'react';

import SlideEditorHeader from './SlideEditorHeader';
import { Card } from '@/components/admin/ui/card';

type SectionEditorShellProps = {
  title: string;
  description: string;
  shownOnPage: boolean;
  onShownOnPageChange: (shown: boolean) => void;
  isError?: boolean;
  children: ReactNode;
};

export default function SectionEditorShell({
  title,
  description,
  shownOnPage,
  onShownOnPageChange,
  isError,
  children,
}: SectionEditorShellProps) {
  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-6">
        <SlideEditorHeader
          title={title}
          description={description}
          shownOnPage={shownOnPage}
          onShownOnPageChange={onShownOnPageChange}
        />
        {children}
        {isError && (
          <p className="text-[12px] text-red-600">Could not publish changes.</p>
        )}
      </div>
    </Card>
  );
}
