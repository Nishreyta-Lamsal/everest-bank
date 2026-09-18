'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, SavingHeroContent } from '@/types/admin';

type SavingHeroEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function SavingHeroEditor({
  slug,
  section,
}: SavingHeroEditorProps) {
  const content = localizedContent<SavingHeroContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [buttonLabel, setButtonLabel] = useState(content.button?.label ?? '');
  const [buttonHref, setButtonHref] = useState(content.button?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<SavingHeroContent>(slug, section, () => ({
      heading,
      button: { label: buttonLabel, href: buttonHref },
    }));

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Heading and the hero button"
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
