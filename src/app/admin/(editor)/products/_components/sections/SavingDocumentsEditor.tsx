'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, SavingDocumentsContent } from '@/types/admin';

type SavingDocumentsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type DocumentStep = NonNullable<SavingDocumentsContent['steps']>[number];

export default function SavingDocumentsEditor({
  slug,
  section,
}: SavingDocumentsEditorProps) {
  const content = localizedContent<SavingDocumentsContent>(section.content);

  const [image, setImage] = useState(content.image);
  const [steps, setSteps] = useState<DocumentStep[]>(content.steps ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<SavingDocumentsContent>(slug, section, () => ({
      image,
      steps,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updateStep(index: number, next: DocumentStep) {
    setSteps(steps.map((step, i) => (i === index ? next : step)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Image, the required documents and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <MediaField
        label="Image"
        media={image}
        onSelect={setImage}
        onRemove={() => setImage(undefined)}
      />

      {steps.map((step, index) => (
        <FieldPairRow
          key={index}
          label={`Document ${index + 1}`}
          primaryValue={step.title ?? ''}
          onPrimaryChange={(title) => updateStep(index, { ...step, title })}
          secondaryValue={step.description ?? ''}
          onSecondaryChange={(description) =>
            updateStep(index, { ...step, description })
          }
          secondaryPlaceholder="Description"
          onRemove={() => setSteps(steps.filter((_, i) => i !== index))}
          removeLabel={`Remove document ${index + 1}`}
        />
      ))}

      <ButtonFieldGroup
        label="Section link"
        buttonLabel={ctaLabel}
        onButtonLabelChange={setCtaLabel}
        linkTarget={ctaHref}
        onLinkTargetChange={setCtaHref}
        onRemove={() => {
          setCtaLabel('');
          setCtaHref('');
        }}
      />
    </SectionEditorShell>
  );
}
