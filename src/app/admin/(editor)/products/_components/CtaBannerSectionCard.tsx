'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import StatFieldRow, {
  type StatFieldValue,
} from '@/components/admin/shared/StatFieldRow';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { icon } from '@/components/admin/icons';

type PrimaryCtaState = {
  label: string;
  linkTarget: string;
};

const EMPTY_CTA: PrimaryCtaState = { label: '', linkTarget: '' };

export default function CtaBannerSectionCard() {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [stats, setStats] = useState<StatFieldValue[]>([]);
  const [primaryCta, setPrimaryCta] = useState<PrimaryCtaState>(EMPTY_CTA);

  function updateStat(index: number, next: StatFieldValue) {
    setStats((current) =>
      current.map((stat, i) => (i === index ? next : stat)),
    );
  }

  function removeStat(index: number) {
    setStats((current) => current.filter((_, i) => i !== index));
  }

  return (
    <ProductSectionCard title="CTA Banner">
      <div className="border-black-alpha-5 flex w-full flex-col gap-3 border-b pb-3">
        <FieldLabel label="Headline">
          <Input
            variant="default"
            size="medium"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Description">
          <Textarea
            variant="default"
            size="medium"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FieldLabel>
      </div>

      <div className="border-black-alpha-5 flex w-full flex-col gap-3 border-b pb-4">
        <FieldLabel label="Stats">
          <div className="flex w-full flex-col gap-3">
            {stats.map((stat, index) => (
              <StatFieldRow
                key={index}
                stat={stat}
                onChange={(next) => updateStat(index, next)}
                onRemove={() => removeStat(index)}
              />
            ))}
          </div>
        </FieldLabel>

        <Button
          type="button"
          variant="secondary"
          size="large"
          className="w-full"
          onClick={() =>
            setStats((current) => [...current, { value: '', title: '' }])
          }
        >
          <icon.plus />
          Add stat
        </Button>
      </div>

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
    </ProductSectionCard>
  );
}
