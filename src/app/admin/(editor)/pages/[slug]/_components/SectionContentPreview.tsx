'use client';

import SlideEditorHeader from './SlideEditorHeader';
import { Card } from '@/components/admin/ui/card';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead } from '@/types/admin';

type SectionContentPreviewProps = {
  section: PageSectionRead;
};

export default function SectionContentPreview({
  section,
}: SectionContentPreviewProps) {
  const content = localizedContent<Record<string, unknown>>(section.content);

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-4">
        <SlideEditorHeader
          title={section.label}
          description={`Section type: ${section.section_type}`}
          shownOnPage={section.is_visible}
          onShownOnPageChange={() => {}}
        />
        <p className="text-[12px] text-neutral-700 opacity-[0.72]">
          No dedicated editor for this section type yet. Its current content is
          shown below.
        </p>
        <pre className="max-h-[420px] w-full overflow-auto rounded-[6px] bg-slate-50 p-3 text-[11px] leading-[1.5] text-slate-700">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    </Card>
  );
}
