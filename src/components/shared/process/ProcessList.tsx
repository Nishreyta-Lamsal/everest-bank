'use client';

import { useEffect, useRef, useState } from 'react';

import ProcessItem from './ProcessItem';

import type { ProcessStep } from '@/types';

type ProcessListProps = {
  steps: ProcessStep[];
};

const AUTO_EXPAND_DELAY = 10000;

export default function ProcessList({ steps }: ProcessListProps) {
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

      setActiveIndex((current) => (current + 1) % steps.length);
      setCycle((current) => current + 1);
    }, AUTO_EXPAND_DELAY);
  }

  useEffect(() => {
    startAutoExpand();

    return stopAutoExpand;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

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
      {steps.map((step, index) => (
        <ProcessItem
          key={step.title}
          step={step}
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
