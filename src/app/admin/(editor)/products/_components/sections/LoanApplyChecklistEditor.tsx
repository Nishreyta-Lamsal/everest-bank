'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanApplyChecklistContent, PageSectionRead } from '@/types/admin';

type LoanApplyChecklistEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type ChecklistItem = NonNullable<LoanApplyChecklistContent['items']>[number];

export default function LoanApplyChecklistEditor({
  slug,
  section,
}: LoanApplyChecklistEditorProps) {
  const content = localizedContent<LoanApplyChecklistContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [image, setImage] = useState(content.image);
  const [applyHref, setApplyHref] = useState(content.apply_href ?? '');
  const [items, setItems] = useState<ChecklistItem[]>(content.items ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<LoanApplyChecklistContent>(slug, section, () => ({
      heading,
      image,
      apply_href: applyHref,
      items,
    }));

  function updateItem(index: number, next: ChecklistItem) {
    setItems(items.map((item, i) => (i === index ? next : item)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Heading, image, the checklist steps and the apply link"
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

      <MediaField
        label="Image"
        media={image}
        onSelect={setImage}
        onRemove={() => setImage(undefined)}
      />

      {items.map((item, index) => (
        <FieldPairRow
          key={index}
          label={`Item ${index + 1}`}
          primaryValue={item.title ?? ''}
          onPrimaryChange={(title) => updateItem(index, { ...item, title })}
          secondaryValue={item.description ?? ''}
          onSecondaryChange={(description) =>
            updateItem(index, { ...item, description })
          }
          secondaryPlaceholder="Description"
          onRemove={() => setItems(items.filter((_, i) => i !== index))}
          removeLabel={`Remove item ${index + 1}`}
        />
      ))}

      <FieldLabel label="Apply link">
        <LinkTargetSelect value={applyHref} onChange={setApplyHref} />
      </FieldLabel>
    </SectionEditorShell>
  );
}
