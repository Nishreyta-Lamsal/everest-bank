import type { ReactNode } from 'react';

import SlideEditorHeader from './SlideEditorHeader';
import { Card } from '@/components/admin/ui/card';

import { readApiError } from '@/lib/admin/read-api-error';

type SectionEditorShellProps = {
  title: string;
  description: string;
  shownOnPage: boolean;
  onShownOnPageChange: (shown: boolean) => void;
  isError?: boolean;
  error?: unknown;
  children: ReactNode;
};

export default function SectionEditorShell({
  title,
  description,
  shownOnPage,
  onShownOnPageChange,
  isError,
  error,
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
          <p className="text-[12px] text-red-600">
            {readApiError(error, 'Could not publish changes.')}
          </p>
        )}
      </div>
    </Card>
  );
}
