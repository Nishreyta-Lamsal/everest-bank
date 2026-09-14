'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { icon } from '@/components/admin/icons';

const FRAME_WIDTH = 1400;

type LivePreviewProps = {
  children: ReactNode;
};

export default function LivePreview({ children }: LivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.contentRect.height);
    });

    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  const scale = containerWidth ? containerWidth / FRAME_WIDTH : 0;

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2">
      <p className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600">
        <icon.eye className="size-3.5" />
        Live Preview
      </p>
      <div
        ref={containerRef}
        className="min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto rounded-[12px] border border-slate-200 bg-white"
      >
        {children ? (
          <div style={{ height: scale ? contentHeight * scale : 0 }}>
            <div
              ref={contentRef}
              inert
              className="pointer-events-none origin-top-left select-none"
              style={{
                width: `${FRAME_WIDTH}px`,
                transform: `scale(${scale})`,
              }}
            >
              {children}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[12px] text-neutral-700 opacity-[0.72]">
              No live preview available for this page yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
