'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { ContentHeroContent, PageSectionRead } from '@/types/admin';

type ContentHeroEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function ContentHeroEditor({
  slug,
  section,
}: ContentHeroEditorProps) {
  const content = localizedContent<ContentHeroContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [image, setImage] = useState(content.image);
  const [buttonLabel, setButtonLabel] = useState(content.button?.label ?? '');
  const [buttonHref, setButtonHref] = useState(content.button?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentHeroContent>(slug, section, () => ({
      heading,
      image,
      button: { label: buttonLabel, href: buttonHref },
    }));

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Heading, background image and the hero button"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Heading">
        <Textarea
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Background image"
        media={image}
        onSelect={setImage}
        onRemove={() => setImage(undefined)}
      />

      <ButtonFieldGroup
        label="Hero button"
        buttonLabel={buttonLabel}
        onButtonLabelChange={setButtonLabel}
        linkTarget={buttonHref}
        onLinkTargetChange={setButtonHref}
        onRemove={() => {
          setButtonLabel('');
          setButtonHref('');
        }}
      />
    </SectionEditorShell>
  );
}
