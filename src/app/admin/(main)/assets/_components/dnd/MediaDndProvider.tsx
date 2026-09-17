'use client';

import { useState } from 'react';

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';

import MediaThumbnail from '../MediaThumbnail';
import { FOLDER_PREFIX, type MediaDragData } from './media-dnd';

import { useMoveMedia } from '@/hooks/api/admin/use-media-library';

import type { ReactNode } from 'react';
import type { Media } from '@/types/admin';

type MediaDndProviderProps = {
  children: ReactNode;
};

export default function MediaDndProvider({ children }: MediaDndProviderProps) {
  const [dragged, setDragged] = useState<Media | null>(null);

  const moveMedia = useMoveMedia();

  // A small threshold keeps a plain click from starting a drag.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as MediaDragData | undefined;

    setDragged(data?.media ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setDragged(null);

    const overId = String(event.over?.id ?? '');
    const data = event.active.data.current as MediaDragData | undefined;

    if (!data?.media || !overId.startsWith(FOLDER_PREFIX)) return;

    const folderId = Number(overId.slice(FOLDER_PREFIX.length));

    if (data.media.folder?.id === folderId) return;

    moveMedia.mutate({ media_ids: [data.media.id], folder: folderId });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setDragged(null)}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {dragged && (
          <div className="flex items-center gap-2 rounded-[8px] border border-black/5 bg-white p-2 shadow-lg">
            <MediaThumbnail
              mediaType={dragged.media_type}
              src={dragged.thumbnail_url ?? dragged.file_url}
              className="size-10"
            />
            <p className="max-w-[160px] truncate text-[13px] font-medium text-neutral-900">
              {dragged.title || 'Untitled'}
            </p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
