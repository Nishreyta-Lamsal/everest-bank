'use client';

import { useState } from 'react';

import StatFieldRow from '@/components/admin/shared/StatFieldRow';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanStatsContent, PageSectionRead } from '@/types/admin';

type LoanStatsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type StatItem = NonNullable<LoanStatsContent['items']>[number];

export default function LoanStatsEditor({
  slug,
  section,
}: LoanStatsEditorProps) {
  const content = localizedContent<LoanStatsContent>(section.content);

  const [items, setItems] = useState<StatItem[]>(content.items ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<LoanStatsContent>(slug, section, () => ({ items }));

  function updateItem(index: number, next: StatItem) {
    setItems(items.map((item, i) => (i === index ? next : item)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="The headline figures shown across this section"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {items.map((item, index) => (
        <StatFieldRow
          key={index}
          stat={{ value: item.value ?? '', title: item.label ?? '' }}
          onChange={(next) =>
            updateItem(index, { value: next.value, label: next.title })
          }
          onRemove={() => setItems(items.filter((_, i) => i !== index))}
          titlePlaceholder="Label for the stat"
        />
      ))}
    </SectionEditorShell>
  );
}
