'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, SavingStepsContent } from '@/types/admin';

type SavingStepsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type SavingStep = NonNullable<SavingStepsContent['steps']>[number];

export default function SavingStepsEditor({
  slug,
  section,
}: SavingStepsEditorProps) {
  const content = localizedContent<SavingStepsContent>(section.content);

  const [steps, setSteps] = useState<SavingStep[]>(content.steps ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<SavingStepsContent>(slug, section, () => ({
    steps,
    cta: { label: ctaLabel, href: ctaHref },
  }));

  function updateStep(index: number, next: SavingStep) {
    setSteps(steps.map((step, i) => (i === index ? next : step)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The steps to open an account and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
        >
          <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
            Step {index + 1}
            {step.title ? ` · ${step.title}` : ''}
          </p>

          <FieldLabel label="Step number">
            <Input
              variant="filled"
              size="medium"
              placeholder="01"
              value={step.number ?? ''}
              onChange={(event) =>
                updateStep(index, { ...step, number: event.target.value })
              }
            />
          </FieldLabel>

          <FieldLabel label="Title">
            <Input
              variant="filled"
              size="medium"
              value={step.title ?? ''}
              onChange={(event) =>
                updateStep(index, { ...step, title: event.target.value })
              }
            />
          </FieldLabel>

          <MediaField
            label="Image"
            media={step.image}
            isUploading={isUploading}
            onUpload={(file) =>
              uploadImage(file, (image) =>
                updateStep(index, { ...step, image }),
              )
            }
          />
        </div>
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
