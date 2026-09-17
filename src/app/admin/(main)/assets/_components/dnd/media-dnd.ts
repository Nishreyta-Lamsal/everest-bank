'use client';

import { useDraggable, useDroppable } from '@dnd-kit/core';

import type { Media } from '@/types/admin';

export const MEDIA_PREFIX = 'media:';
export const FOLDER_PREFIX = 'folder:';

export type MediaDragData = { media: Media };

export function useMediaDraggable(media: Media) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${MEDIA_PREFIX}${media.id}`,
    data: { media } satisfies MediaDragData,
  });

  return { attributes, listeners, setNodeRef, isDragging };
}

export function useFolderDroppable(folderId: number) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: `${FOLDER_PREFIX}${folderId}`,
  });

  const dragged = (active?.data.current as MediaDragData | undefined)?.media;

  return {
    setNodeRef,
    // Highlight only when dropping would actually move the file.
    isOver: isOver && Boolean(dragged) && dragged?.folder?.id !== folderId,
  };
}
