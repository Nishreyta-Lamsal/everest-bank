'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanHeroContent, PageSectionRead } from '@/types/admin';

type LoanHeroEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function LoanHeroEditor({ slug, section }: LoanHeroEditorProps) {
  const content = localizedContent<LoanHeroContent>(section.content);

  const [title, setTitle] = useState(content.title ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [image, setImage] = useState(content.image);
  const [primaryLabel, setPrimaryLabel] = useState(
    content.primary_cta?.label ?? '',
  );
  const [primaryHref, setPrimaryHref] = useState(
    content.primary_cta?.href ?? '',
  );
  const [secondaryLabel, setSecondaryLabel] = useState(
    content.secondary_cta?.label ?? '',
  );
  const [secondaryHref, setSecondaryHref] = useState(
    content.secondary_cta?.href ?? '',
  );

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<LoanHeroContent>(slug, section, () => ({
    title,
    description,
    image,
    primary_cta: { label: primaryLabel, href: primaryHref },
    secondary_cta: { label: secondaryLabel, href: secondaryHref },
  }));

  return (
    <SectionEditorShell
      title={section.label}
      description="Title, description, image and the hero buttons"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Title">
        <Input
          variant="filled"
          size="medium"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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

      <MediaField
        label="Image"
        media={image}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setImage)}
        onRemove={() => setImage(undefined)}
      />

      <ButtonFieldGroup
        label="Primary button"
        buttonLabel={primaryLabel}
        onButtonLabelChange={setPrimaryLabel}
        linkTarget={primaryHref}
        onLinkTargetChange={setPrimaryHref}
        onRemove={() => {
          setPrimaryLabel('');
          setPrimaryHref('');
        }}
      />

      <ButtonFieldGroup
        label="Secondary button"
        buttonLabel={secondaryLabel}
        onButtonLabelChange={setSecondaryLabel}
        linkTarget={secondaryHref}
        onLinkTargetChange={setSecondaryHref}
        onRemove={() => {
          setSecondaryLabel('');
          setSecondaryHref('');
        }}
      />
    </SectionEditorShell>
  );
}
