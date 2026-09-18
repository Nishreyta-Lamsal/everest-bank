'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const BORDER_WIDTH = 4;
const HANDLE_SIZE = 22;
const HANDLE_OFFSET = -((HANDLE_SIZE - BORDER_WIDTH) / 2);

const CORNERS = [
  { top: HANDLE_OFFSET, left: HANDLE_OFFSET },
  { top: HANDLE_OFFSET, right: HANDLE_OFFSET },
  { bottom: HANDLE_OFFSET, left: HANDLE_OFFSET },
  { bottom: HANDLE_OFFSET, right: HANDLE_OFFSET },
];

type PreviewSectionHighlightProps = {
  sectionType: string;
  activeSectionType: string;
  children: ReactNode;
};


export default function PreviewSectionHighlight({
  sectionType,
  activeSectionType,
  children,
}: PreviewSectionHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const wasActiveRef = useRef(false);

  const isActive = Boolean(sectionType) && activeSectionType === sectionType;

  useEffect(
    function () {
      if (isActive && !wasActiveRef.current) {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      wasActiveRef.current = isActive;
    },
    [isActive],
  );

  return (
    <div ref={ref} className="relative scroll-my-8">
      {children}
      {isActive && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-10 border-blue-500"
          style={{
            inset: `${HANDLE_SIZE / 2}px`,
            borderWidth: `${BORDER_WIDTH}px`,
          }}
        >
          {CORNERS.map((corner, index) => (
            <span
              key={index}
              className="absolute border-blue-500 bg-white"
              style={{
                ...corner,
                width: `${HANDLE_SIZE}px`,
                height: `${HANDLE_SIZE}px`,
                borderWidth: `${BORDER_WIDTH}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
