'use client';

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import PagesListRow from './PagesListRow';

import { useReorderPages } from '@/hooks/api/admin/use-pages';

import type { Page } from '@/types/admin';

type PagesListProps = {
  items: Page[];
};

export default function PagesList({ items }: PagesListProps) {
  const reorderPages = useReorderPages();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((page) => page.id === active.id);
    const newIndex = items.findIndex((page) => page.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;


    const reordered = arrayMove(items, oldIndex, newIndex);
    const changed = reordered
      .map((page, index) => ({
        slug: page.slug,
        position: index + 1,
        previous: page.position,
      }))
      .filter((item) => item.position !== item.previous)
      .map(({ slug, position }) => ({ slug, position }));

    if (changed.length === 0) return;

    reorderPages.mutate(changed);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((page) => page.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex w-full flex-col divide-y divide-black/3">
          {items.map((page) => (
            <PagesListRow key={page.id} page={page} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
