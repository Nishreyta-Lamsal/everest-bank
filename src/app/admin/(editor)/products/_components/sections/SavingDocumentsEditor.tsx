'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
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
      <FieldLabel label="Image">
        {image?.src ? (
          <ImagePreview
            src={image.src}
            alt={image.alt}
            onReplace={(picked) => setImage(toSectionMedia(picked))}
            onRemove={() => setImage(undefined)}
          />
        ) : (
          <ImageDropzone
            onMediaSelected={(picked) => setImage(toSectionMedia(picked))}
          />
        )}
      </FieldLabel>

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
