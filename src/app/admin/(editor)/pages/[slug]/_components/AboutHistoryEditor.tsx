'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { AboutHistoryContent, PageSectionRead } from '@/types/admin';

type AboutHistoryEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function AboutHistoryEditor({
  slug,
  section,
}: AboutHistoryEditorProps) {
  const content = localizedContent<AboutHistoryContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [intro, setIntro] = useState(content.intro ?? '');
  const [body, setBody] = useState(content.body ?? '');
  const [image, setImage] = useState(content.image);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
    useSectionEditor<AboutHistoryContent>(slug, section, () => ({
      heading,
      intro,
      body,
      image,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, intro and body copy, image and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
    >
      <FieldLabel label="Heading">
        <Input
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Intro">
        <Textarea
          variant="filled"
          size="medium"
          value={intro}
          onChange={(event) => setIntro(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Body">
        <Textarea
          variant="filled"
          size="medium"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Image"
        media={image}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setImage)}
        onRemove={() => setImage(undefined)}
      />

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
