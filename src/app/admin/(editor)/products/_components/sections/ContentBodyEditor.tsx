'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  ContentBodyContent,
  ContentImagesBlock,
  ContentQuoteBlock,
  ContentTextBlock,
  PageSectionRead,
} from '@/types/admin';

type ContentBodyEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type BodyBlock = NonNullable<ContentBodyContent['blocks']>[number];

function isImagesBlock(block: BodyBlock): block is ContentImagesBlock {
  return block.type === 'images';
}

function isQuoteBlock(block: BodyBlock): block is ContentQuoteBlock {
  return block.type === 'quote';
}

export default function ContentBodyEditor({
  slug,
  section,
}: ContentBodyEditorProps) {
  const content = localizedContent<ContentBodyContent>(section.content);

  const [blocks, setBlocks] = useState<BodyBlock[]>(content.blocks ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentBodyContent>(slug, section, () => ({ blocks }));

  function updateBlock(index: number, next: BodyBlock) {
    setBlocks(blocks.map((block, i) => (i === index ? next : block)));
  }

  function updateImage(
    blockIndex: number,
    block: ContentImagesBlock,
    imageIndex: number,
    next: ContentImagesBlock['images'][number],
  ) {
    updateBlock(blockIndex, {
      ...block,
      images: block.images.map((image, i) => (i === imageIndex ? next : image)),
    });
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The text and image blocks that make up the page body"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {blocks.map((block, index) =>
        isImagesBlock(block) ? (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Block {index + 1} · Images
            </p>

            {block.images.map((image, imageIndex) => (
              <MediaField
                key={imageIndex}
                label={`Image ${imageIndex + 1}`}
                media={image}
                onSelect={(uploaded) =>
                  updateImage(index, block, imageIndex, uploaded)
                }
              />
            ))}
          </div>
        ) : isQuoteBlock(block) ? (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Block {index + 1} · Quote
            </p>

            <FieldLabel label="Quote">
              <Textarea
                variant="filled"
                size="medium"
                value={block.title ?? ''}
                onChange={(event) =>
                  updateBlock(index, { ...block, title: event.target.value })
                }
              />
            </FieldLabel>
          </div>
        ) : (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Block {index + 1}
              {block.heading ? ` · ${block.heading}` : ''}
            </p>

            <FieldLabel label="Heading">
              <Input
                variant="filled"
                size="medium"
                value={block.heading ?? ''}
                onChange={(event) =>
                  updateBlock(index, { ...block, heading: event.target.value })
                }
              />
            </FieldLabel>

            {(block.paragraphs ?? []).map((paragraph, paragraphIndex) => (
              <FieldLabel
                key={paragraphIndex}
                label={`Paragraph ${paragraphIndex + 1}`}
              >
                <Textarea
                  variant="filled"
                  size="medium"
                  value={paragraph}
                  onChange={(event) =>
                    updateBlock(index, {
                      ...(block as ContentTextBlock),
                      paragraphs: (block.paragraphs ?? []).map((current, i) =>
                        i === paragraphIndex ? event.target.value : current,
                      ),
                    })
                  }
                />
              </FieldLabel>
            ))}
          </div>
        ),
      )}
    </SectionEditorShell>
  );
}
