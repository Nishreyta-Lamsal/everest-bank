'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { CardsTrustBarContent, PageSectionRead } from '@/types/admin';

type CardsTrustBarEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type TrustBadge = NonNullable<CardsTrustBarContent['badges']>[number];

export default function CardsTrustBarEditor({
  slug,
  section,
}: CardsTrustBarEditorProps) {
  const content = localizedContent<CardsTrustBarContent>(section.content);

  const [label, setLabel] = useState(content.label ?? '');
  const [badges, setBadges] = useState<TrustBadge[]>(content.badges ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<CardsTrustBarContent>(slug, section, () => ({
      label,
      badges,
    }));

  function updateBadge(index: number, next: TrustBadge) {
    setBadges(badges.map((badge, i) => (i === index ? next : badge)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The intro label and the trust badges shown beside it"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Label">
        <Input
          variant="filled"
          size="medium"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
      </FieldLabel>

      {badges.map((badge, index) => (
        <FieldLabel key={index} label={`Badge ${index + 1}`}>
          <Input
            variant="filled"
            size="medium"
            value={badge.label ?? ''}
            onChange={(event) =>
              updateBadge(index, { ...badge, label: event.target.value })
            }
          />
        </FieldLabel>
      ))}
    </SectionEditorShell>
  );
}
