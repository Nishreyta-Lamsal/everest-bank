'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import CalendarsList from './calendars-list/CalendarsList';
import CalendarEditDrawer from './calendars-list/CalendarEditDrawer';

import { useCalendars } from '@/hooks/api/admin/use-calendars';

export default function CalendarsScreen() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data, isPending, isError } = useCalendars();

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-heading-3 text-neutral-900">Calendars</p>
          <p className="text-paragraph-sm text-neutral-700">
            Yearly e-calendars published on the website, newest year first.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddOpen(true)}>
          <icon.plus />
          Add calendar
        </Button>
      </section>

      <Card variant="primary" className="w-full px-4 py-3">
        <CalendarsList
          items={data ?? []}
          isPending={isPending}
          isError={isError}
        />
      </Card>

      {isAddOpen && (
        <CalendarEditDrawer
          entry={null}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </div>
  );
}
