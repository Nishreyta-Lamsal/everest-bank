'use client';

import { useState } from 'react';

import FaqItem from './FaqItem';

import type { FaqListProps } from '@/types';

export default function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full flex-col items-start">
      {items.map((item, index) => (
        <FaqItem
          key={item.question}
          item={item}
          isOpen={index === openIndex}
          onToggle={() =>
            setOpenIndex((current) => (current === index ? -1 : index))
          }
        />
      ))}
    </div>
  );
}
