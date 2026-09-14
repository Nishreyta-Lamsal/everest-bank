'use client';

import { useState } from 'react';

import FieldLabel from './FieldLabel';
import MediaField from './MediaField';
import LinkTargetSelect from './LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { icon } from '@/components/admin/icons';
// import { Button } from '@/components/admin/ui/button';
import { Input, inputVariants } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';
import { cn } from '@/lib/utils';

import type {
  CardsPreviewContent,
  CardsPreviewTile,
  PageSectionRead,
} from '@/types/admin';

type CardsPreviewEditorProps = {
  slug: string;
  section: PageSectionRead;
};

const CORNERS = ['left', 'right'];

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

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
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
      description="Heading, tiles, background image and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
    >
      <FieldLabel label="Heading (one line per row)">
        <Textarea
          variant="filled"
          size="medium"
          value={headingLines}
          onChange={(event) => setHeadingLines(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Background image"
        media={background}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setBackground)}
        onRemove={() => setBackground(undefined)}
      />

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

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={tile.href ?? ''}
                onChange={(href) => updateTile(index, { ...tile, href })}
              />
            </FieldLabel>

            <FieldLabel label="Rounded corner">
              <div
                className={inputVariants({
                  variant: 'default',
                  size: 'medium',
                })}
              >
                <select
                  value={tile.rounded_corner ?? ''}
                  onChange={(event) =>
                    updateTile(index, {
                      ...tile,
                      rounded_corner: event.target.value || undefined,
                    })
                  }
                  className={cn(
                    'w-full min-w-0 appearance-none border-none bg-transparent p-0 text-sm outline-none',
                    tile.rounded_corner
                      ? 'text-slate-950'
                      : 'text-black-alpha-40',
                  )}
                >
                  <option value="">None</option>
                  {CORNERS.map((corner) => (
                    <option
                      key={corner}
                      value={corner}
                      className="text-slate-950"
                    >
                      {corner}
                    </option>
                  ))}
                </select>
                <icon.chevronDown className="size-4 shrink-0 text-[#999999]" />
              </div>
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
