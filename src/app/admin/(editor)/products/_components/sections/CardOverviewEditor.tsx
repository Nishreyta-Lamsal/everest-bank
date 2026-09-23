'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import CardTableFieldGroup from './CardTableFieldGroup';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  CardOverviewContent,
  CardVariantContent,
  PageSectionRead,
} from '@/types/admin';

type CardOverviewEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function CardOverviewEditor({
  slug,
  section,
}: CardOverviewEditorProps) {
  const content = localizedContent<CardOverviewContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [brandsHeading, setBrandsHeading] = useState(
    content.brands_heading ?? '',
  );
  const [brands, setBrands] = useState<string[]>(content.brands ?? []);
  const [variants, setVariants] = useState<CardVariantContent[]>(
    content.variants ?? [],
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<CardOverviewContent>(slug, section, () => ({
      heading,
      description,
      brands_heading: brandsHeading,
      brands,
      variants,
    }));

  function updateVariant(index: number, next: CardVariantContent) {
    setVariants(variants.map((variant, i) => (i === index ? next : variant)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The card intro, accepted brands and each card variant's details"
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

      <FieldLabel label="Description">
        <Textarea
          variant="filled"
          size="medium"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Brands heading">
        <Input
          variant="filled"
          size="medium"
          value={brandsHeading}
          onChange={(event) => setBrandsHeading(event.target.value)}
        />
      </FieldLabel>

      {brands.map((brand, index) => (
        <FieldLabel key={index} label={`Brand ${index + 1}`}>
          <Input
            variant="filled"
            size="medium"
            value={brand}
            onChange={(event) =>
              setBrands(
                brands.map((current, i) =>
                  i === index ? event.target.value : current,
                ),
              )
            }
          />
        </FieldLabel>
      ))}

      {variants.map((variant, index) => (
        <div
          key={index}
          className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
        >
          <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
            Variant {index + 1}
            {variant.title ? ` · ${variant.title}` : ''}
          </p>

          <FieldLabel label="Title">
            <Input
              variant="filled"
              size="medium"
              value={variant.title ?? ''}
              onChange={(event) =>
                updateVariant(index, { ...variant, title: event.target.value })
              }
            />
          </FieldLabel>

          <FieldLabel label="Brand">
            <Input
              variant="filled"
              size="medium"
              value={variant.brand ?? ''}
              onChange={(event) =>
                updateVariant(index, { ...variant, brand: event.target.value })
              }
            />
          </FieldLabel>

          <FieldLabel label="Card face">
            {variant.face?.src ? (
              <ImagePreview
                src={variant.face.src}
                alt={variant.face.alt}
                onReplace={(picked) =>
                  updateVariant(index, {
                    ...variant,
                    face: toSectionMedia(picked),
                  })
                }
              />
            ) : (
              <ImageDropzone
                onMediaSelected={(picked) =>
                  updateVariant(index, {
                    ...variant,
                    face: toSectionMedia(picked),
                  })
                }
              />
            )}
          </FieldLabel>

          <FieldLabel label="Features heading">
            <Input
              variant="filled"
              size="medium"
              value={variant.features?.heading ?? ''}
              onChange={(event) =>
                updateVariant(index, {
                  ...variant,
                  features: {
                    heading: event.target.value,
                    items: variant.features?.items ?? [],
                  },
                })
              }
            />
          </FieldLabel>

          {(variant.features?.items ?? []).map((item, itemIndex) => (
            <FieldLabel key={itemIndex} label={`Feature ${itemIndex + 1}`}>
              <Textarea
                variant="filled"
                size="medium"
                value={item}
                onChange={(event) =>
                  updateVariant(index, {
                    ...variant,
                    features: {
                      heading: variant.features?.heading ?? '',
                      items: (variant.features?.items ?? []).map(
                        (current, i) =>
                          i === itemIndex ? event.target.value : current,
                      ),
                    },
                  })
                }
              />
            </FieldLabel>
          ))}

          <FieldLabel label="Eligibility heading">
            <Input
              variant="filled"
              size="medium"
              value={variant.eligibility?.heading ?? ''}
              onChange={(event) =>
                updateVariant(index, {
                  ...variant,
                  eligibility: {
                    heading: event.target.value,
                    description: variant.eligibility?.description ?? '',
                  },
                })
              }
            />
          </FieldLabel>

          <FieldLabel label="Eligibility description">
            <Textarea
              variant="filled"
              size="medium"
              value={variant.eligibility?.description ?? ''}
              onChange={(event) =>
                updateVariant(index, {
                  ...variant,
                  eligibility: {
                    heading: variant.eligibility?.heading ?? '',
                    description: event.target.value,
                  },
                })
              }
            />
          </FieldLabel>

          <FieldLabel label="How to apply heading">
            <Input
              variant="filled"
              size="medium"
              value={variant.procedure?.heading ?? ''}
              onChange={(event) =>
                updateVariant(index, {
                  ...variant,
                  procedure: {
                    heading: event.target.value,
                    items: variant.procedure?.items ?? [],
                  },
                })
              }
            />
          </FieldLabel>

          {(variant.procedure?.items ?? []).map((item, itemIndex) => (
            <FieldLabel key={itemIndex} label={`Step ${itemIndex + 1}`}>
              <Textarea
                variant="filled"
                size="medium"
                value={item}
                onChange={(event) =>
                  updateVariant(index, {
                    ...variant,
                    procedure: {
                      heading: variant.procedure?.heading ?? '',
                      items: (variant.procedure?.items ?? []).map(
                        (current, i) =>
                          i === itemIndex ? event.target.value : current,
                      ),
                    },
                  })
                }
              />
            </FieldLabel>
          ))}

          {variant.limits_table && (
            <CardTableFieldGroup
              label="Limits table"
              table={variant.limits_table}
              onChange={(limits_table) =>
                updateVariant(index, { ...variant, limits_table })
              }
            />
          )}

          {(variant.fee_tables ?? []).map((table, tableIndex) => (
            <CardTableFieldGroup
              key={tableIndex}
              label={`Fee table ${tableIndex + 1}`}
              table={table}
              onChange={(next) =>
                updateVariant(index, {
                  ...variant,
                  fee_tables: (variant.fee_tables ?? []).map((current, i) =>
                    i === tableIndex ? next : current,
                  ),
                })
              }
            />
          ))}
        </div>
      ))}
    </SectionEditorShell>
  );
}
