'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import StatFieldRow from '@/components/admin/shared/StatFieldRow';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanImpactContent, PageSectionRead } from '@/types/admin';

type LoanImpactEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type ImpactStat = NonNullable<LoanImpactContent['stats']>[number];

export default function LoanImpactEditor({
  slug,
  section,
}: LoanImpactEditorProps) {
  const content = localizedContent<LoanImpactContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [applyHref, setApplyHref] = useState(content.apply_href ?? '');
  const [stats, setStats] = useState<ImpactStat[]>(content.stats ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<LoanImpactContent>(slug, section, () => ({
      heading,
      description,
      apply_href: applyHref,
      stats,
    }));

  function updateStat(index: number, next: ImpactStat) {
    setStats(stats.map((stat, i) => (i === index ? next : stat)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, description, the impact figures and the apply link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Heading">
        <Input
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Description">
        <Textarea
          variant="filled"
          size="medium"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldLabel>

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

      <FieldLabel label="Apply link">
        <LinkTargetSelect value={applyHref} onChange={setApplyHref} />
      </FieldLabel>
    </SectionEditorShell>
  );
}
