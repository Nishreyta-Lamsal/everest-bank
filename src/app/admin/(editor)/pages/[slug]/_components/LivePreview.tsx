'use client';

import { useEffect, useRef, useState } from 'react';

const PREVIEW_ORIGIN = process.env.NEXT_PUBLIC_PREVIEW_ORIGIN ?? '';

// The frame renders at a real desktop width, then scales down to fit the
// panel — sizing it to the panel instead would trigger the mobile layout.
const FRAME_WIDTH = 1440;

export default function LivePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  if (!PREVIEW_ORIGIN) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white">
        <p className="text-[12px] text-neutral-700 opacity-[0.72]">
          Set NEXT_PUBLIC_PREVIEW_ORIGIN to enable the preview.
        </p>
      </div>
    );
  }

  const scale = size.width ? size.width / FRAME_WIDTH : 0;

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2">
      <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
        Live Preview
      </p>
      <div
        ref={containerRef}
        className="min-h-0 w-full flex-1 overflow-hidden rounded-[12px] border border-slate-200 bg-white"
      >
        {scale > 0 && (
          <iframe
            src={`${PREVIEW_ORIGIN}?preview=1`}
            title="Live preview"
            className="origin-top-left border-0"
            style={{
              width: `${FRAME_WIDTH}px`,
              // Fill the panel exactly once scaled, so no dead space is left.
              height: `${size.height / scale}px`,
              transform: `scale(${scale})`,
            }}
          />
        )}
      </div>
    </div>
  );
}
