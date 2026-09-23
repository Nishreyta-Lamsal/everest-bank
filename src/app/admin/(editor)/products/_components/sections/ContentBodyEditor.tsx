'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { usePageEditor } from '@/store/PageEditorContext';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { FocusEvent } from 'react';
import type {
  ContentBodyContent,
  ContentGroupBlock,
  ContentGroupCard,
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

function isGroupBlock(block: BodyBlock): block is ContentGroupBlock {
  return block.type === 'group';
}

export default function ContentBodyEditor({
  slug,
  section,
}: ContentBodyEditorProps) {
  const { setFocusedItemId } = usePageEditor();

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

  function updateCard(
    blockIndex: number,
    block: ContentGroupBlock,
    cardIndex: number,
    next: ContentGroupCard,
  ) {
    updateBlock(blockIndex, {
      ...block,
      cards: block.cards.map((card, i) => (i === cardIndex ? next : card)),
    });
  }

  function blockFocusProps(index: number) {
    return {
      onFocusCapture: () => setFocusedItemId(`block-${index}`),
      onBlurCapture: (event: FocusEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;

        setFocusedItemId('');
      },
    };
  }

  function updateItem(
    blockIndex: number,
    block: ContentGroupBlock,
    cardIndex: number,
    card: ContentGroupCard,
    itemIndex: number,
    next: ContentGroupCard['items'][number],
  ) {
    updateCard(blockIndex, block, cardIndex, {
      ...card,
      items: card.items.map((item, i) => (i === itemIndex ? next : item)),
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
            {...blockFocusProps(index)}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Block {index + 1} · Images
            </p>

            {block.images.map((image, imageIndex) => (
              <FieldLabel key={imageIndex} label={`Image ${imageIndex + 1}`}>
                {image.src ? (
                  <ImagePreview
                    src={image.src}
                    alt={image.alt}
                    onReplace={(picked) =>
                      updateImage(
                        index,
                        block,
                        imageIndex,
                        toSectionMedia(picked),
                      )
                    }
                  />
                ) : (
                  <ImageDropzone
                    onMediaSelected={(picked) =>
                      updateImage(
                        index,
                        block,
                        imageIndex,
                        toSectionMedia(picked),
                      )
                    }
                  />
                )}
              </FieldLabel>
            ))}
          </div>
        ) : isQuoteBlock(block) ? (
          <div
            key={index}
            {...blockFocusProps(index)}
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
        ) : isGroupBlock(block) ? (
          <div
            key={index}
            {...blockFocusProps(index)}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Block {index + 1} · Group
              {block.heading ? ` · ${block.heading}` : ''}
            </p>

            <div className="flex w-full items-start gap-3">
              <FieldLabel label="Label">
                <Input
                  variant="filled"
                  size="medium"
                  value={block.label ?? ''}
                  onChange={(event) =>
                    updateBlock(index, { ...block, label: event.target.value })
                  }
                />
              </FieldLabel>
              <FieldLabel label="Heading">
                <Input
                  variant="filled"
                  size="medium"
                  value={block.heading ?? ''}
                  onChange={(event) =>
                    updateBlock(index, {
                      ...block,
                      heading: event.target.value,
                    })
                  }
                />
              </FieldLabel>
            </div>

            {block.cards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] bg-[#fafbfd] p-3"
              >
                <p className="min-w-0 truncate text-[12px] font-semibold text-neutral-700">
                  Card {cardIndex + 1}
                  {card.heading ? ` · ${card.heading}` : ''}
                </p>

                <div className="flex w-full items-start gap-3">
                  <FieldLabel label="Icon">
                    <Input
                      variant="filled"
                      size="medium"
                      value={card.icon ?? ''}
                      onChange={(event) =>
                        updateCard(index, block, cardIndex, {
                          ...card,
                          icon: event.target.value,
                        })
                      }
                    />
                  </FieldLabel>
                  <FieldLabel label="Heading">
                    <Input
                      variant="filled"
                      size="medium"
                      value={card.heading ?? ''}
                      onChange={(event) =>
                        updateCard(index, block, cardIndex, {
                          ...card,
                          heading: event.target.value,
                        })
                      }
                    />
                  </FieldLabel>
                </div>

                <FieldLabel label="Description">
                  <Input
                    variant="filled"
                    size="medium"
                    value={card.description ?? ''}
                    onChange={(event) =>
                      updateCard(index, block, cardIndex, {
                        ...card,
                        description: event.target.value,
                      })
                    }
                  />
                </FieldLabel>

                {card.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex w-full flex-col gap-2 rounded-[6px] border border-[#e6ecf4] bg-white p-2.5"
                  >
                    <p className="min-w-0 truncate text-[11px] font-semibold text-neutral-500">
                      Item {itemIndex + 1}
                    </p>

                    <div className="flex w-full items-start gap-3">
                      <FieldLabel label="Name">
                        <Input
                          variant="filled"
                          size="medium"
                          value={item.name ?? ''}
                          onChange={(event) =>
                            updateItem(
                              index,
                              block,
                              cardIndex,
                              card,
                              itemIndex,
                              { ...item, name: event.target.value },
                            )
                          }
                        />
                      </FieldLabel>
                      <FieldLabel label="Badge">
                        <Input
                          variant="filled"
                          size="medium"
                          value={item.badge ?? ''}
                          onChange={(event) =>
                            updateItem(
                              index,
                              block,
                              cardIndex,
                              card,
                              itemIndex,
                              { ...item, badge: event.target.value },
                            )
                          }
                        />
                      </FieldLabel>
                    </div>

                    <div className="flex w-full items-start gap-3">
                      <FieldLabel label="Role">
                        <Input
                          variant="filled"
                          size="medium"
                          value={item.role ?? ''}
                          onChange={(event) =>
                            updateItem(
                              index,
                              block,
                              cardIndex,
                              card,
                              itemIndex,
                              { ...item, role: event.target.value },
                            )
                          }
                        />
                      </FieldLabel>
                      <FieldLabel label="Departments">
                        <Input
                          variant="filled"
                          size="medium"
                          value={item.departments ?? ''}
                          onChange={(event) =>
                            updateItem(
                              index,
                              block,
                              cardIndex,
                              card,
                              itemIndex,
                              { ...item, departments: event.target.value },
                            )
                          }
                        />
                      </FieldLabel>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div
            key={index}
            {...blockFocusProps(index)}
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
