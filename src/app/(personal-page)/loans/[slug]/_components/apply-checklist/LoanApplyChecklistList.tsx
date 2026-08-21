'use client';

import { useEffect, useRef, useState } from 'react';

import LoanApplyChecklistItem from './LoanApplyChecklistItem';

import type { LoanApplyChecklistItem as LoanApplyChecklistItemData } from '../../_data';

type LoanApplyChecklistListProps = {
  items: LoanApplyChecklistItemData[];
};

const AUTO_EXPAND_DELAY = 10000;

export default function LoanApplyChecklistList({
  items,
}: LoanApplyChecklistListProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  function stopAutoExpand() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startAutoExpand() {
    stopAutoExpand();

    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;

      setActiveIndex((current) => (current + 1) % items.length);
      setCycle((current) => current + 1);
    }, AUTO_EXPAND_DELAY);
  }

  useEffect(() => {
    startAutoExpand();

    return stopAutoExpand;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  function handleSelect(index: number) {
    setActiveIndex(index);
    setCycle((current) => current + 1);
    startAutoExpand();
  }

  return (
    <div
      className="flex w-full flex-col items-start gap-4 lg:gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {items.map((item, index) => (
        <LoanApplyChecklistItem
          key={item.title}
          item={item}
          isActive={index === activeIndex}
          isPaused={isPaused}
          progressKey={`${activeIndex}-${cycle}`}
          duration={AUTO_EXPAND_DELAY}
          onSelect={() => handleSelect(index)}
        />
      ))}
    </div>
  );
}
