'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanFaqsContent, PageSectionRead } from '@/types/admin';

type LoanFaqsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type FaqItem = NonNullable<LoanFaqsContent['items']>[number];

export default function LoanFaqsEditor({ slug, section }: LoanFaqsEditorProps) {
  const content = localizedContent<LoanFaqsContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [items, setItems] = useState<FaqItem[]>(content.items ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<LoanFaqsContent>(slug, section, () => ({
      heading,
      items,
    }));

  function updateItem(index: number, next: FaqItem) {
    setItems(items.map((item, i) => (i === index ? next : item)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Section heading and the question and answer pairs"
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

      {items.map((item, index) => (
        <FieldPairRow
          key={index}
          label={`Question ${index + 1}`}
          primaryValue={item.question ?? ''}
          onPrimaryChange={(question) =>
            updateItem(index, { ...item, question })
          }
          secondaryValue={item.answer ?? ''}
          onSecondaryChange={(answer) => updateItem(index, { ...item, answer })}
          secondaryPlaceholder="Answer"
          onRemove={() => setItems(items.filter((_, i) => i !== index))}
          removeLabel={`Remove question ${index + 1}`}
        />
      ))}
    </SectionEditorShell>
  );
}
