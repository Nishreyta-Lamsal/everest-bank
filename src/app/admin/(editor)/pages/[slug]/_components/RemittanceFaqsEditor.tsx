'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, RemittanceFaqsContent } from '@/types/admin';

type RemittanceFaqsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type FaqItem = NonNullable<RemittanceFaqsContent['items']>[number];

/**
 * Editor for the `remittance_faqs` section: a heading and the
 * question/answer pairs.
 */
export default function RemittanceFaqsEditor({
  slug,
  section,
}: RemittanceFaqsEditorProps) {
  const content = localizedContent<RemittanceFaqsContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [items, setItems] = useState<FaqItem[]>(content.items ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<RemittanceFaqsContent>(slug, section, () => ({
      heading,
      items,
    }));

  function updateItem(index: number, next: FaqItem) {
    setItems(items.map((item, i) => (i === index ? next : item)));
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
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

      <div className="flex w-full flex-col gap-4">
        <p className="text-[16px] font-semibold text-neutral-900">Questions</p>

        {items.map((item, index) => (
          <FieldPairRow
            key={index}
            label={`Question ${index + 1}`}
            primaryValue={item.question ?? ''}
            onPrimaryChange={(question) =>
              updateItem(index, { ...item, question })
            }
            secondaryValue={item.answer ?? ''}
            onSecondaryChange={(answer) =>
              updateItem(index, { ...item, answer })
            }
            secondaryPlaceholder="Answer"
            onRemove={() => removeItem(index)}
            removeLabel={`Remove question ${index + 1}`}
          />
        ))}
      </div>
    </SectionEditorShell>
  );
}
