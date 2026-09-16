'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import MediaField from '@/components/admin/shared/MediaField';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

import type { SectionMedia } from '@/types/admin';

type ProductInfoRow = {
  title: string;
  value: string;
};

type CtaState = {
  label: string;
  linkTarget: string;
};

const EMPTY_CTA: CtaState = { label: '', linkTarget: '' };

export default function ProductInfoSectionCard() {
  const [image, setImage] = useState<SectionMedia | undefined>();
  const [rows, setRows] = useState<ProductInfoRow[]>([]);
  const [primaryCta, setPrimaryCta] = useState<CtaState>(EMPTY_CTA);
  const [secondaryCta, setSecondaryCta] = useState<CtaState | null>(null);

  function updateRow(index: number, next: ProductInfoRow) {
    setRows((current) => current.map((row, i) => (i === index ? next : row)));
  }

  function removeRow(index: number) {
    setRows((current) => current.filter((_, i) => i !== index));
  }

  return (
    <ProductSectionCard title="Product info">
      <div className="border-black-alpha-5 flex w-full flex-col gap-3 border-b pb-4">
        <MediaField
          label="Right-Side Image"
          media={image}
          onUpload={(file) =>
            setImage({ src: URL.createObjectURL(file), alt: '' })
          }
          onRemove={() => setImage(undefined)}
        />

        {rows.map((row, index) => (
          <FieldPairRow
            key={index}
            label={`Information ${index + 1}`}
            primaryValue={row.title}
            onPrimaryChange={(value) =>
              updateRow(index, { ...row, title: value })
            }
            secondaryValue={row.value}
            onSecondaryChange={(value) => updateRow(index, { ...row, value })}
            onRemove={() => removeRow(index)}
            removeLabel={`Remove information ${index + 1}`}
          />
        ))}

        <Button
          type="button"
          variant="secondary"
          size="large"
          className="w-full"
          onClick={() =>
            setRows((current) => [...current, { title: '', value: '' }])
          }
        >
          <icon.plus />
          Add
        </Button>
      </div>

      <div className="flex w-full flex-col gap-3">
        <ButtonFieldGroup
          label="Primary CTA"
          buttonLabel={primaryCta.label}
          onButtonLabelChange={(label) =>
            setPrimaryCta((cta) => ({ ...cta, label }))
          }
          linkTarget={primaryCta.linkTarget}
          onLinkTargetChange={(linkTarget) =>
            setPrimaryCta((cta) => ({ ...cta, linkTarget }))
          }
          onRemove={() => setPrimaryCta(EMPTY_CTA)}
        />

        {secondaryCta ? (
          <ButtonFieldGroup
            label="Secondary CTA"
            buttonLabel={secondaryCta.label}
            onButtonLabelChange={(label) =>
              setSecondaryCta((cta) => cta && { ...cta, label })
            }
            linkTarget={secondaryCta.linkTarget}
            onLinkTargetChange={(linkTarget) =>
              setSecondaryCta((cta) => cta && { ...cta, linkTarget })
            }
            onRemove={() => setSecondaryCta(null)}
          />
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="large"
            className="w-full"
            onClick={() => setSecondaryCta(EMPTY_CTA)}
          >
            <icon.plus />
            Add button
          </Button>
        )}
      </div>
    </ProductSectionCard>
  );
}
