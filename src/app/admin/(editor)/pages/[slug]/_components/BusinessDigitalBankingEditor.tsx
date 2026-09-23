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
  BusinessDigitalBankingContent,
  PageSectionRead,
} from '@/types/admin';

type BusinessDigitalBankingEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type Feature = NonNullable<BusinessDigitalBankingContent['features']>[number];

export default function BusinessDigitalBankingEditor({
  slug,
  section,
}: BusinessDigitalBankingEditorProps) {
  const content = localizedContent<BusinessDigitalBankingContent>(
    section.content,
  );

  const [heading, setHeading] = useState(content.heading ?? '');
  const [image, setImage] = useState(content.image);
  const [features, setFeatures] = useState<Feature[]>(content.features ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<BusinessDigitalBankingContent>(slug, section, () => ({
      heading,
      image,
      features,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updateFeature(index: number, next: Feature) {
    setFeatures(features.map((feature, i) => (i === index ? next : feature)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, image, feature list and the section link"
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

      <FieldLabel label="Image">
        {image?.src ? (
          <ImagePreview
            src={image.src}
            alt={image.alt}
            onReplace={(picked) => setImage(toSectionMedia(picked))}
            onRemove={() => setImage(undefined)}
          />
        ) : (
          <ImageDropzone
            onMediaSelected={(picked) => setImage(toSectionMedia(picked))}
          />
        )}
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Features</p>

        {features.map((feature, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Feature {index + 1}
              {feature.label ? ` · ${feature.label}` : ''}
            </p>

            <FieldLabel label="Label">
              <Input
                variant="filled"
                size="medium"
                value={feature.label ?? ''}
                onChange={(event) =>
                  updateFeature(index, {
                    ...feature,
                    label: event.target.value,
                  })
                }
              />
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
