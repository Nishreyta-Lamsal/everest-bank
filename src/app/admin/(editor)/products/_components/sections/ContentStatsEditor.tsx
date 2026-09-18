'use client';

import { useState } from 'react';

import StatFieldRow from '@/components/admin/shared/StatFieldRow';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';

import { localizedContent } from '@/lib/admin/section-content';

import type { ContentStatsContent, PageSectionRead } from '@/types/admin';

type ContentStatsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type StatItem = NonNullable<ContentStatsContent['stats']>[number];

export default function ContentStatsEditor({
  slug,
  section,
}: ContentStatsEditorProps) {
  const content = localizedContent<ContentStatsContent>(section.content);

  const [stats, setStats] = useState<StatItem[]>(content.stats ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentStatsContent>(slug, section, () => ({ stats }));

  function updateStat(index: number, next: StatItem) {
    setStats(stats.map((stat, i) => (i === index ? next : stat)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The headline figures shown across this section"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {stats.map((stat, index) => (
        <StatFieldRow
          key={index}
          stat={{ value: stat.value ?? '', title: stat.label ?? '' }}
          onChange={(next) =>
            updateStat(index, { value: next.value, label: next.title })
          }
          onRemove={() => setStats(stats.filter((_, i) => i !== index))}
          titlePlaceholder="Label for the stat"
        />
      ))}
    </SectionEditorShell>
  );
}
