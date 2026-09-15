'use client';

import { useState } from 'react';

import ProductSectionCard from './ProductSectionCard';
import StatFieldRow, {
  type StatFieldValue,
} from '@/components/admin/shared/StatFieldRow';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

const MAX_STATS = 4;
const EMPTY_STAT: StatFieldValue = { value: '', title: '' };

export default function KeyStatsSectionCard() {
  const [stats, setStats] = useState<StatFieldValue[]>(() =>
    Array.from({ length: MAX_STATS }, () => ({ ...EMPTY_STAT })),
  );

  function updateStat(index: number, next: StatFieldValue) {
    setStats((current) =>
      current.map((stat, i) => (i === index ? next : stat)),
    );
  }

  function removeStat(index: number) {
    setStats((current) => current.filter((_, i) => i !== index));
  }

  return (
    <ProductSectionCard
      title="Key Stats / Numbers"
      description="Add maximum 4 stats"
    >
      {stats.map((stat, index) => (
        <StatFieldRow
          key={index}
          stat={stat}
          onChange={(next) => updateStat(index, next)}
          onRemove={() => removeStat(index)}
        />
      ))}

      {stats.length < MAX_STATS && (
        <Button
          type="button"
          variant="secondary"
          size="large"
          className="w-full"
          onClick={() =>
            setStats((current) => [...current, { ...EMPTY_STAT }])
          }
        >
          <icon.plus />
          Add stat
        </Button>
      )}
    </ProductSectionCard>
  );
}
