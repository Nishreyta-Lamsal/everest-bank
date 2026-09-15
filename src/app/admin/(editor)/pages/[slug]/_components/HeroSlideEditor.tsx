'use client';

import { useEffect, useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import SlideEditorHeader from './SlideEditorHeader';
import { usePageEditor } from '@/store/PageEditorContext';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { useUpdatePageSection } from '@/hooks/api/admin/use-page-sections';
import { useUploadMedia } from '@/hooks/api/admin/use-media';
import {
  localizedContent,
  mergeLocalizedContent,
} from '@/lib/admin/section-content';

import type { HeroContent, PageSectionRead, SectionMedia } from '@/types/admin';

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
  const updateSection = useUpdatePageSection(slug, section.id);
  const uploadMedia = useUploadMedia();
  const { registerPublishHandler, setDraftContent, setDraftVisibility } =
    usePageEditor();

  const [shownOnPage, setShownOnPage] = useState(section.is_visible);
  const [headline, setHeadline] = useState(
    (content.headline_lines ?? []).join(' '),
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

  function handleFileSelected(file: File) {
    uploadMedia.mutate(
      { file },
      {
        onSuccess: (media) => {
          if (!media.file_url) return;

          const uploaded: SectionMedia = {
            src: media.file_url,
            alt: media.alt_text || media.title || '',
            media_id: media.id,
          };

          setSlides((current) =>
            isSingleImageHero ? [uploaded] : [...current, uploaded],
          );
        },
      },
    );
  }

  function removeSlide(index: number) {
    setSlides((current) => current.filter((_, i) => i !== index));
  }

  function handleSlideReplace(index: number, file: File) {
    uploadMedia.mutate(
      { file },
      {
        onSuccess: (media) => {
          if (!media.file_url) return;

          const uploaded: SectionMedia = {
            src: media.file_url,
            alt: media.alt_text || media.title || '',
            media_id: media.id,
          };

          setSlides((current) =>
            current.map((slide, i) => (i === index ? uploaded : slide)),
          );
        },
      },
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
      video_chip: {
        text: videoChipText,
        link_label: videoChipLink.label,
        link_href: videoChipLink.linkTarget,
      },
    });
  }

  async function publishChanges() {
    await updateSection.mutateAsync({
      is_visible: shownOnPage,
      content: buildContent(),
    });
  }

  // Re-register each render so the handler closes over the latest field values.
  useEffect(() => {
    registerPublishHandler(publishChanges);

    return () => registerPublishHandler(null);
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
    slides,
    primaryButton,
    secondaryButton,
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
            description="Headline, description, CTAs, carousel imager"
            shownOnPage={shownOnPage}
            onShownOnPageChange={setShownOnPage}
          />
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-col gap-1">
              <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
                Headline
              </p>
              <Input
                variant="filled"
                size="medium"
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
                Supporting text
              </p>
              <Textarea
                variant="filled"
                size="medium"
                value={supportingText}
                onChange={(event) => setSupportingText(event.target.value)}
              />
            </div>
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
                      onReplace={(file) => handleSlideReplace(index, file)}
                      onRemove={() => removeSlide(index)}
                      isUploading={uploadMedia.isPending}
                    />
                  ))}
                </div>
              )}
              <ImageDropzone
                onFileSelected={handleFileSelected}
                isUploading={uploadMedia.isPending}
                error={
                  uploadMedia.isError
                    ? (uploadMedia.error?.message ?? 'Could not upload image.')
                    : undefined
                }
              />
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
            <div className="flex w-full flex-col gap-1">
              <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
                Chip text
              </p>
              <Textarea
                variant="filled"
                size="medium"
                value={videoChipText}
                onChange={(event) => setVideoChipText(event.target.value)}
              />
            </div>
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
        {updateSection.isError && (
          <p className="text-[12px] text-red-600">Could not publish changes.</p>
        )}
      </div>
    </Card>
  );
}
