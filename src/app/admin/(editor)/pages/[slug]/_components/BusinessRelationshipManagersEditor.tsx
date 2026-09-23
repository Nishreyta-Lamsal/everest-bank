'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  BusinessRelationshipManagersContent,
  PageSectionRead,
} from '@/types/admin';

type BusinessRelationshipManagersEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type Manager = NonNullable<
  BusinessRelationshipManagersContent['managers']
>[number];

export default function BusinessRelationshipManagersEditor({
  slug,
  section,
}: BusinessRelationshipManagersEditorProps) {
  const content = localizedContent<BusinessRelationshipManagersContent>(
    section.content,
  );

  const [heading, setHeading] = useState(content.heading ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [managers, setManagers] = useState<Manager[]>(content.managers ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<BusinessRelationshipManagersContent>(
      slug,
      section,
      () => ({
        heading,
        description,
        managers,
        cta: { label: ctaLabel, href: ctaHref },
      }),
    );

  function updateManager(index: number, next: Manager) {
    setManagers(managers.map((manager, i) => (i === index ? next : manager)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, description, manager cards and the section link"
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

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Managers</p>

        {managers.map((manager, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Manager {index + 1}
              {manager.name ? ` · ${manager.name}` : ''}
            </p>

            <FieldLabel label="Name">
              <Input
                variant="filled"
                size="medium"
                value={manager.name ?? ''}
                onChange={(event) =>
                  updateManager(index, { ...manager, name: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Role">
              <Input
                variant="filled"
                size="medium"
                value={manager.role ?? ''}
                onChange={(event) =>
                  updateManager(index, { ...manager, role: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Portrait">
              {manager.image?.src ? (
                <ImagePreview
                  src={manager.image.src}
                  alt={manager.image.alt}
                  onReplace={(picked) =>
                    updateManager(index, {
                      ...manager,
                      image: toSectionMedia(picked),
                    })
                  }
                />
              ) : (
                <ImageDropzone
                  onMediaSelected={(picked) =>
                    updateManager(index, {
                      ...manager,
                      image: toSectionMedia(picked),
                    })
                  }
                />
              )}
            </FieldLabel>
          </div>
        ))}
      </div>

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
