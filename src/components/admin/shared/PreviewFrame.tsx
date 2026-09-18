'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PreviewFrameProps = {
  /** The width the page is rendered at inside the frame. */
  width: number;
  bodyClassName?: string;
  children: ReactNode;
};

export default function PreviewFrame({
  width,
  bodyClassName,
  children,
}: PreviewFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(
    function () {
      const frame = frameRef.current;
      const doc = frame?.contentDocument;

      if (!doc) return;

      const copied = new Set<Node>();

      function syncStyles() {
        for (const node of document.head.querySelectorAll(
          'style, link[rel="stylesheet"]',
        )) {
          if (copied.has(node)) continue;

          copied.add(node);
          doc!.head.append(node.cloneNode(true));
        }
      }

      syncStyles();

      const observer = new MutationObserver(syncStyles);

      observer.observe(document.head, { childList: true });

      // Carries the `next/font` variables, which are declared on `<html>`.
      doc.documentElement.className = document.documentElement.className;

      doc.body.className = bodyClassName ?? '';
      doc.body.style.margin = '0';

      setMountNode(doc.body);

      return () => observer.disconnect();
    },
    [bodyClassName],
  );

  // An iframe doesn't grow with its content, so its height tracks the page
  // inside it and the parent scales the whole frame.
  useEffect(
    function () {
      if (!mountNode) return;

      const observer = new ResizeObserver(function () {
        setContentHeight(mountNode.scrollHeight);
      });

      observer.observe(mountNode);

      return () => observer.disconnect();
    },
    [mountNode],
  );

  return (
    <iframe
      ref={frameRef}
      title="Live preview"
      scrolling="no"
      className="block border-0"
      style={{ width: `${width}px`, height: `${contentHeight}px` }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
