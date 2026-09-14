'use client';

import { useState } from 'react';

import FieldLabel from './FieldLabel';
import SectionEditorShell from './SectionEditorShell';
import SlideImageThumbnail from './SlideImageThumbnail';
import ImageDropzone from './ImageDropzone';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, SectionMedia, TrustContent } from '@/types/admin';

type TrustBannerEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function TrustBannerEditor({
  slug,
  section,
}: TrustBannerEditorProps) {
  const content = localizedContent<TrustContent>(section.content);

  const [title, setTitle] = useState(content.title ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [images, setImages] = useState<SectionMedia[]>(content.images ?? []);

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
    useSectionEditor<TrustContent>(slug, section, () => ({
      title,
      description,
      images,
    }));

  return (
    <SectionEditorShell
      title={section.label}
      description="Headline figure, caption and banner images"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
    >
      <FieldLabel label="Title">
        <Input
          variant="filled"
          size="medium"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Description">
        <Input
          variant="filled"
          size="medium"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full flex-col gap-2">
        <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
          Banner images
        </p>
        {images.length > 0 && (
          <div className="flex w-full flex-wrap items-center gap-2">
            {images.map((image, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <SlideImageThumbnail src={image.src} alt={image.alt} />
                {/* <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  aria-label={`Remove image ${index + 1}`}
                  className="text-[11px] text-slate-600"
                >
                  Remove
                </button> */}
              </div>
            ))}
          </div>
        )}
        <ImageDropzone
          isUploading={isUploading}
          onFileSelected={(file) =>
            uploadImage(file, (media) =>
              setImages((current) => [...current, media]),
            )
          }
        />
      </div>
    </SectionEditorShell>
  );
}
