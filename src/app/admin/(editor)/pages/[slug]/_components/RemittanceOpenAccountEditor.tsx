'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  PageSectionRead,
  RemittanceOpenAccountContent,
} from '@/types/admin';

type RemittanceOpenAccountEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type Feature = NonNullable<RemittanceOpenAccountContent['features']>[number];

/**
 * Editor for the `remittance_open_account` section: heading, the promo video
 * and its poster, the feature list and the section CTA.
 */
export default function RemittanceOpenAccountEditor({
  slug,
  section,
}: RemittanceOpenAccountEditorProps) {
  const content = localizedContent<RemittanceOpenAccountContent>(
    section.content,
  );

  const [heading, setHeading] = useState(content.heading ?? '');
  const [videoSrc, setVideoSrc] = useState(content.video?.src ?? '');
  const [poster, setPoster] = useState(content.video?.poster);
  const [features, setFeatures] = useState<Feature[]>(content.features ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<RemittanceOpenAccountContent>(slug, section, () => ({
    heading,
    video: { src: videoSrc, poster },
    features,
    cta: { label: ctaLabel, href: ctaHref },
  }));

  function updateFeature(index: number, next: Feature) {
    setFeatures(features.map((feature, i) => (i === index ? next : feature)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, promo video, feature list and the section link"
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

      <FieldLabel label="Video URL">
        <Input
          variant="filled"
          size="medium"
          placeholder="https://example.com/video.mp4"
          value={videoSrc}
          onChange={(event) => setVideoSrc(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Video poster"
        media={poster}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setPoster)}
        onRemove={() => setPoster(undefined)}
      />

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Features</p>

        {features.map((feature, index) => (
          <FieldLabel key={index} label={`Feature ${index + 1}`}>
            <Input
              variant="filled"
              size="medium"
              value={feature.label ?? ''}
              onChange={(event) =>
                updateFeature(index, { ...feature, label: event.target.value })
              }
            />
          </FieldLabel>
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
