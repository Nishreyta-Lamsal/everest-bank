'use client';

import { useEffect, useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import Pill from '@/components/admin/shared/Pill';
import SlideEditorHeader from './SlideEditorHeader';
import { usePageEditor } from '@/store/PageEditorContext';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { readApiError } from '@/lib/admin/read-api-error';
import {
  localizedContent,
  mergeLocalizedContent,
} from '@/lib/admin/section-content';

import type {
  HeroContent,
  Media,
  PageSectionRead,
  SectionMedia,
} from '@/types/admin';

type SlideButtonState = {
  label: string;
  linkTarget: string;
};

type HeroSlideEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function HeroSlideEditor({
  slug,
  section,
}: HeroSlideEditorProps) {
  const content = localizedContent<HeroContent>(section.content);
  const {
    registerSectionDraft,
    setDraftContent,
    setDraftVisibility,
    publishError,
  } = usePageEditor();

  const [shownOnPage, setShownOnPage] = useState(section.is_visible);
  const [headline, setHeadline] = useState(
    (content.headline_lines ?? []).join('\n'),
  );
  const [supportingText, setSupportingText] = useState(content.subtext ?? '');
  const [primaryButton, setPrimaryButton] = useState<SlideButtonState | null>(
    content.primary_button
      ? {
          label: content.primary_button.label ?? '',
          linkTarget: content.primary_button.href ?? '',
        }
      : null,
  );
  const [secondaryButton, setSecondaryButton] =
    useState<SlideButtonState | null>(
      content.secondary_button
        ? {
            label: content.secondary_button.label ?? '',
            linkTarget: content.secondary_button.href ?? '',
          }
        : null,
    );

  const hasHighlights = section.section_type === 'business_hero';

  const [highlights, setHighlights] = useState<string[]>(
    content.highlights ?? [],
  );
  const [newHighlight, setNewHighlight] = useState('');

  const hasVideoChip = Boolean(content.video_chip);

  const [video, setVideo] = useState<SectionMedia | null>(
    content.video?.src ? content.video : null,
  );

  const [videoChipText, setVideoChipText] = useState(
    content.video_chip?.text ?? '',
  );
  const [videoChipLink, setVideoChipLink] = useState<SlideButtonState>({
    label: content.video_chip?.link_label ?? '',
    linkTarget: content.video_chip?.link_href ?? '',
  });

  const isSingleImageHero = !content.slides && Boolean(content.image);

  const [slides, setSlides] = useState<SectionMedia[]>(() =>
    (content.slides ?? (content.image ? [content.image] : [])).filter(
      (slide): slide is SectionMedia => Boolean(slide?.src),
    ),
  );

  function handleMediaSelected(picked: Media) {
    const selected = toSectionMedia(picked);

    setSlides((current) =>
      isSingleImageHero ? [selected] : [...current, selected],
    );
  }

  function addHighlight() {
    const value = newHighlight.trim();

    if (!value) return;

    setHighlights((current) => [...current, value]);
    setNewHighlight('');
  }

  function removeHighlight(index: number) {
    setHighlights((current) => current.filter((_, i) => i !== index));
  }

  function removeSlide(index: number) {
    setSlides((current) => current.filter((_, i) => i !== index));
  }

  function handleSlideReplace(index: number, picked: Media) {
    const selected = toSectionMedia(picked);

    setSlides((current) =>
      current.map((slide, i) => (i === index ? selected : slide)),
    );
  }

  function buildContent() {
    const validSlides = slides.filter((slide) => Boolean(slide.src));

    return mergeLocalizedContent<HeroContent>(section.content, {
      ...(isSingleImageHero
        ? validSlides[0]
          ? { image: validSlides[0] }
          : {}
        : { slides: validSlides }),
      headline_lines: headline
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      subtext: supportingText,
      ...(hasHighlights ? { highlights } : {}),
      ...(primaryButton
        ? {
            primary_button: {
              label: primaryButton.label,
              href: primaryButton.linkTarget,
            },
          }
        : {}),
      ...(secondaryButton
        ? {
            secondary_button: {
              label: secondaryButton.label,
              href: secondaryButton.linkTarget,
            },
          }
        : {}),
      ...(hasVideoChip
        ? {
            ...(video ? { video } : {}),
            video_chip: {
              text: videoChipText,
              link_label: videoChipLink.label,
              link_href: videoChipLink.linkTarget,
            },
          }
        : {}),
    });
  }

  // Re-registers each render so the payload reflects the latest field values.
  useEffect(() => {
    registerSectionDraft(section.id, {
      slug,
      item: {
        id: section.id,
        section_type: section.section_type,
        is_visible: shownOnPage,
        content: buildContent(),
      },
    });

    return () => registerSectionDraft(section.id, null);
  });

  // Mirror the in-progress fields into the shared draft so the live preview
  // re-renders as they change.
  useEffect(() => {
    setDraftContent(section.id, buildContent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    section.id,
    headline,
    supportingText,
    highlights,
    slides,
    primaryButton,
    secondaryButton,
    video,
    videoChipText,
    videoChipLink,
  ]);

  useEffect(() => {
    setDraftVisibility(section.id, shownOnPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section.id, shownOnPage]);

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full flex-col gap-3">
          <SlideEditorHeader
            title={section.label}
            description={
              hasHighlights
                ? 'Headline, supporting text, highlights, CTAs and carousel images'
                : 'Headline, supporting text, CTAs and carousel images'
            }
            shownOnPage={shownOnPage}
            onShownOnPageChange={setShownOnPage}
          />
          <div className="flex w-full flex-col gap-3">
            <FieldLabel label="Headline (one line per row)">
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
                value={supportingText}
                onChange={(event) => setSupportingText(event.target.value)}
              />
            </FieldLabel>
            {hasHighlights && (
              <FieldLabel label="Highlights">
                <div className="flex w-full flex-col gap-3">
                  {highlights.length > 0 && (
                    <div className="flex w-full flex-wrap items-center gap-2">
                      {highlights.map((highlight, index) => (
                        <Pill
                          key={`${highlight}-${index}`}
                          onRemove={() => removeHighlight(index)}
                          removeLabel={`Remove ${highlight}`}
                        >
                          {highlight}
                        </Pill>
                      ))}
                    </div>
                  )}
                  <div className="flex w-full items-center gap-4">
                    <Input
                      variant="default"
                      size="medium"
                      placeholder="Account opening in 1–2 days"
                      value={newHighlight}
                      onChange={(event) => setNewHighlight(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          addHighlight();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="large"
                      className="shrink-0"
                      onClick={addHighlight}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </FieldLabel>
            )}

            <div className="flex w-full flex-col gap-2">
              <p className="text-[12px] font-medium text-slate-950">
                Right-Side Image
              </p>
              {slides.length > 0 && (
                <div className="flex w-full flex-wrap items-center gap-2">
                  {slides.map((slide, index) => (
                    <ImagePreview
                      key={`${slide.media_id ?? 'slide'}-${index}`}
                      src={slide.src}
                      alt={slide.alt}
                      onReplace={(picked) => handleSlideReplace(index, picked)}
                      onRemove={() => removeSlide(index)}
                    />
                  ))}
                </div>
              )}
              <ImageDropzone onMediaSelected={handleMediaSelected} />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col gap-1">
            <p className="text-[16px] font-semibold text-neutral-900">
              Buttons on this slide
            </p>
            <p className="text-[12px] text-neutral-700 opacity-[0.72]">
              One or two. Each links to a page from the site&apos;s menus.
            </p>
          </div>
          <div className="flex w-full flex-col gap-6">
            {primaryButton && (
              <ButtonFieldGroup
                label="Primary Button"
                buttonLabel={primaryButton.label}
                onButtonLabelChange={(label) =>
                  setPrimaryButton((button) => button && { ...button, label })
                }
                linkTarget={primaryButton.linkTarget}
                onLinkTargetChange={(linkTarget) =>
                  setPrimaryButton(
                    (button) => button && { ...button, linkTarget },
                  )
                }
                onRemove={() => setPrimaryButton(null)}
              />
            )}
            {secondaryButton && (
              <ButtonFieldGroup
                label="Secondary Button"
                buttonLabel={secondaryButton.label}
                onButtonLabelChange={(label) =>
                  setSecondaryButton((button) => button && { ...button, label })
                }
                linkTarget={secondaryButton.linkTarget}
                onLinkTargetChange={(linkTarget) =>
                  setSecondaryButton(
                    (button) => button && { ...button, linkTarget },
                  )
                }
                onRemove={() => setSecondaryButton(null)}
              />
            )}
          </div>
        </div>
        {hasVideoChip && (
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-col gap-1">
              <p className="text-[16px] font-semibold text-neutral-900">
                Video chip
              </p>
              <p className="text-[12px] text-neutral-700 opacity-[0.72]">
                Short message shown over the carousel, with its own link.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3">
              <FieldLabel label="Video">
                <ImageDropzone
                  mediaType="video"
                  pickerTitle="Choose a video"
                  onMediaSelected={(picked) => setVideo(toSectionMedia(picked))}
                  onRemove={() => setVideo(null)}
                  selectedId={video?.media_id}
                  preview={
                    video ? { src: video.src, alt: video.alt } : undefined
                  }
                />
              </FieldLabel>
              <FieldLabel label="Chip text">
                <Textarea
                  variant="filled"
                  size="medium"
                  value={videoChipText}
                  onChange={(event) => setVideoChipText(event.target.value)}
                />
              </FieldLabel>
              <ButtonFieldGroup
                label="Chip link"
                buttonLabel={videoChipLink.label}
                onButtonLabelChange={(label) =>
                  setVideoChipLink((link) => ({ ...link, label }))
                }
                linkTarget={videoChipLink.linkTarget}
                onLinkTargetChange={(linkTarget) =>
                  setVideoChipLink((link) => ({ ...link, linkTarget }))
                }
                onRemove={() => setVideoChipLink({ label: '', linkTarget: '' })}
              />
            </div>
          </div>
        )}
        {Boolean(publishError) && (
          <p className="text-[12px] text-red-600">
            {readApiError(publishError, 'Could not publish changes.')}
          </p>
        )}
      </div>
    </Card>
  );
}
