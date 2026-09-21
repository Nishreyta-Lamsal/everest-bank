'use client';

import { useState } from 'react';

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
  PageSectionRead,
  RemittanceHeroContent,
  SectionMedia,
} from '@/types/admin';

type RemittanceHeroEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function RemittanceHeroEditor({
  slug,
  section,
}: RemittanceHeroEditorProps) {
  const content = localizedContent<RemittanceHeroContent>(section.content);

  const [headline, setHeadline] = useState(content.headline ?? '');
  const [subtext, setSubtext] = useState(content.subtext ?? '');
  const [slides, setSlides] = useState<SectionMedia[]>(
    (content.slides ?? []).filter((slide) => Boolean(slide?.src)),
  );
  const [tracking, setTracking] = useState(content.tracking ?? {});

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<RemittanceHeroContent>(slug, section, () => ({
      headline,
      subtext,
      slides,
      tracking,
    }));

  function updateTracking(next: Partial<RemittanceHeroContent['tracking']>) {
    setTracking((current) => ({ ...current, ...next }));
  }

  function replaceSlide(index: number, media: SectionMedia) {
    setSlides((current) =>
      current.map((slide, i) => (i === index ? media : slide)),
    );
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Headline, supporting text, carousel images and the remit tracking form"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Headline">
        <Textarea
          variant="filled"
          size="medium"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Supporting text">
        <Textarea
          variant="filled"
          size="medium"
          value={subtext}
          onChange={(event) => setSubtext(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Carousel images">
        <div className="flex w-full flex-col gap-2">
          {slides.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-2">
              {slides.map((slide, index) => (
                <ImagePreview
                  key={`${slide.media_id ?? 'slide'}-${index}`}
                  src={slide.src}
                  alt={slide.alt}
                  onReplace={(picked) => {
                    const media = toSectionMedia(picked);
                    return replaceSlide(index, media);
                  }}
                  onRemove={() =>
                    setSlides(slides.filter((_, i) => i !== index))
                  }
                />
              ))}
            </div>
          )}
          <ImageDropzone
            onMediaSelected={(picked) => {
              const media = toSectionMedia(picked);
              return setSlides((current) => [...current, media]);
            }}
          />
        </div>
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-1">
          <p className="text-[16px] font-semibold text-neutral-900">
            Remit tracking
          </p>
          <p className="text-[12px] text-neutral-700 opacity-[0.72]">
            The tracking-number form shown beneath the headline.
          </p>
        </div>

        <FieldLabel label="Field placeholder">
          <Input
            variant="filled"
            size="medium"
            value={tracking.placeholder ?? ''}
            onChange={(event) =>
              updateTracking({ placeholder: event.target.value })
            }
          />
        </FieldLabel>

        <FieldLabel label="Button label">
          <Input
            variant="filled"
            size="medium"
            value={tracking.button_label ?? ''}
            onChange={(event) =>
              updateTracking({ button_label: event.target.value })
            }
          />
        </FieldLabel>

        <FieldLabel label="Hint">
          <Input
            variant="filled"
            size="medium"
            value={tracking.hint ?? ''}
            onChange={(event) => updateTracking({ hint: event.target.value })}
          />
        </FieldLabel>

        <FieldLabel label="Field label for screen readers">
          <Input
            variant="filled"
            size="medium"
            value={tracking.aria_label ?? ''}
            onChange={(event) =>
              updateTracking({ aria_label: event.target.value })
            }
          />
        </FieldLabel>
      </div>
    </SectionEditorShell>
  );
}
