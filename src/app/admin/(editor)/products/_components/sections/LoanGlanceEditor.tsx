'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import MediaField from '@/components/admin/shared/MediaField';
import StatFieldRow from '@/components/admin/shared/StatFieldRow';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanGlanceContent, PageSectionRead } from '@/types/admin';

type LoanGlanceEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type GlanceItem = NonNullable<LoanGlanceContent['items']>[number];

export default function LoanGlanceEditor({
  slug,
  section,
}: LoanGlanceEditorProps) {
  const content = localizedContent<LoanGlanceContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [image, setImage] = useState(content.image);
  const [contactHref, setContactHref] = useState(content.contact_href ?? '');
  const [downloadHref, setDownloadHref] = useState(content.download_href ?? '');
  const [items, setItems] = useState<GlanceItem[]>(content.items ?? []);

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<LoanGlanceContent>(slug, section, () => ({
    heading,
    image,
    contact_href: contactHref,
    download_href: downloadHref,
    items,
  }));

  function updateItem(index: number, next: GlanceItem) {
    setItems(items.map((item, i) => (i === index ? next : item)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, image, the summary rows and the section links"
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

      <MediaField
        label="Image"
        media={image}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setImage)}
        onRemove={() => setImage(undefined)}
      />

      {items.map((item, index) => (
        <StatFieldRow
          key={index}
          stat={{ value: item.value ?? '', title: item.label ?? '' }}
          onChange={(next) =>
            updateItem(index, { value: next.value, label: next.title })
          }
          onRemove={() => setItems(items.filter((_, i) => i !== index))}
          valuePlaceholder="Value"
          titlePlaceholder="Label"
        />
      ))}

      <FieldLabel label="Contact link">
        <LinkTargetSelect value={contactHref} onChange={setContactHref} />
      </FieldLabel>

      <FieldLabel label="Download link">
        <LinkTargetSelect value={downloadHref} onChange={setDownloadHref} />
      </FieldLabel>
    </SectionEditorShell>
  );
}
