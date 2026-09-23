'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
// import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  CardsPreviewContent,
  CardsPreviewTile,
  PageSectionRead,
} from '@/types/admin';

type CardsPreviewEditorProps = {
  slug: string;
  section: PageSectionRead;
};

const ROUNDED_CORNER_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
];

export default function CardsPreviewEditor({
  slug,
  section,
}: CardsPreviewEditorProps) {
  const content = localizedContent<CardsPreviewContent>(section.content);

  const [headingLines, setHeadingLines] = useState(
    (content.heading_lines ?? []).join('\n'),
  );
  const [tiles, setTiles] = useState<CardsPreviewTile[]>(content.tiles ?? []);
  const [background, setBackground] = useState(content.background_image);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<CardsPreviewContent>(slug, section, () => ({
      heading_lines: headingLines
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      tiles,
      background_image: background,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updateTile(index: number, next: CardsPreviewTile) {
    setTiles(tiles.map((tile, i) => (i === index ? next : tile)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, tiles with their own images, the fallback background image and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Heading (one line per row)">
        <Textarea
          variant="filled"
          size="medium"
          value={headingLines}
          onChange={(event) => setHeadingLines(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Background image (fallback for tiles without their own image)">
        {background?.src ? (
          <ImagePreview
            src={background.src}
            alt={background.alt}
            onReplace={(picked) => setBackground(toSectionMedia(picked))}
            onRemove={() => setBackground(undefined)}
          />
        ) : (
          <ImageDropzone
            onMediaSelected={(picked) => setBackground(toSectionMedia(picked))}
          />
        )}
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Tiles</p>

        {tiles.map((tile, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <div className="flex w-full items-center justify-between">
              <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
                Tile {index + 1}
                {tile.title ? ` · ${tile.title}` : ''}
              </p>
              {/* <button
                type="button"
                onClick={() => setTiles(tiles.filter((_, i) => i !== index))}
                aria-label={`Remove tile ${index + 1}`}
                className="text-slate-600"
              >
                <icon.trash className="size-4" />
              </button> */}
            </div>

            <FieldLabel label="Title">
              <Input
                variant="filled"
                size="medium"
                value={tile.title ?? ''}
                onChange={(event) =>
                  updateTile(index, { ...tile, title: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Tile image">
              {tile.image?.src ? (
                <ImagePreview
                  src={tile.image.src}
                  alt={tile.image.alt}
                  onReplace={(picked) =>
                    updateTile(index, {
                      ...tile,
                      image: toSectionMedia(picked),
                    })
                  }
                  onRemove={() =>
                    updateTile(index, { ...tile, image: undefined })
                  }
                />
              ) : (
                <ImageDropzone
                  onMediaSelected={(picked) =>
                    updateTile(index, {
                      ...tile,
                      image: toSectionMedia(picked),
                    })
                  }
                />
              )}
            </FieldLabel>

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={tile.href ?? ''}
                onChange={(href) => updateTile(index, { ...tile, href })}
              />
            </FieldLabel>

            <FieldLabel label="Rounded corner">
              <Select
                variant="default"
                size="medium"
                options={ROUNDED_CORNER_OPTIONS}
                value={tile.rounded_corner ?? ''}
                onValueChange={(value) =>
                  updateTile(index, {
                    ...tile,
                    rounded_corner: value || undefined,
                  })
                }
              />
            </FieldLabel>
          </div>
        ))}

        {/* <Button
          variant="secondary"
          size="small"
          className="self-start"
          onClick={() => setTiles([...tiles, { title: '' }])}
        >
          Add tile
        </Button> */}
      </div>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Section link
        </p>
        <FieldLabel label="Link label">
          <Input
            variant="filled"
            size="medium"
            value={ctaLabel}
            onChange={(event) => setCtaLabel(event.target.value)}
          />
        </FieldLabel>
        <FieldLabel label="Links to">
          <LinkTargetSelect value={ctaHref} onChange={setCtaHref} />
        </FieldLabel>
      </div>
    </SectionEditorShell>
  );
}
