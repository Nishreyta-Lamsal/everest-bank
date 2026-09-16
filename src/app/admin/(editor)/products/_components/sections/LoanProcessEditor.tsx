'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanProcessContent, PageSectionRead } from '@/types/admin';

type LoanProcessEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type ProcessStep = NonNullable<LoanProcessContent['steps']>[number];

export default function LoanProcessEditor({
  slug,
  section,
}: LoanProcessEditorProps) {
  const content = localizedContent<LoanProcessContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [applyHref, setApplyHref] = useState(content.apply_href ?? '');
  const [steps, setSteps] = useState<ProcessStep[]>(content.steps ?? []);

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<LoanProcessContent>(slug, section, () => ({
    heading,
    apply_href: applyHref,
    steps,
  }));

  function updateStep(index: number, next: ProcessStep) {
    setSteps(steps.map((step, i) => (i === index ? next : step)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, the application steps and the apply link"
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

      <FieldLabel label="Apply link">
        <LinkTargetSelect value={applyHref} onChange={setApplyHref} />
      </FieldLabel>
    </SectionEditorShell>
  );
}
