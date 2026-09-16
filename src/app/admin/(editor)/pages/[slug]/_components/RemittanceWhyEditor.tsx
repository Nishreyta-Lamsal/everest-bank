'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import StatFieldRow from '@/components/admin/shared/StatFieldRow';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, RemittanceWhyContent } from '@/types/admin';

type RemittanceWhyEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type WhyStat = NonNullable<RemittanceWhyContent['stats']>[number];

/**
 * Editor for the `remittance_why` section: heading and description, the
 * supporting image and the headline stats beside it.
 */
export default function RemittanceWhyEditor({
  slug,
  section,
}: RemittanceWhyEditorProps) {
  const content = localizedContent<RemittanceWhyContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [image, setImage] = useState(content.image);
  const [stats, setStats] = useState<WhyStat[]>(content.stats ?? []);

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<RemittanceWhyContent>(slug, section, () => ({
    heading,
    description,
    image,
    stats,
  }));

  function updateStat(index: number, next: WhyStat) {
    setStats(stats.map((stat, i) => (i === index ? next : stat)));
  }

  function removeStat(index: number) {
    setStats(stats.filter((_, i) => i !== index));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, description, image and the headline stats"
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

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Stats</p>

        {stats.map((stat, index) => (
          <StatFieldRow
            key={index}
            stat={{ value: stat.value ?? '', title: stat.label ?? '' }}
            onChange={(next) =>
              updateStat(index, { value: next.value, label: next.title })
            }
            onRemove={() => removeStat(index)}
            valuePlaceholder="9,000+"
            titlePlaceholder="Label for the stat"
          />
        ))}
      </div>
    </SectionEditorShell>
  );
}
