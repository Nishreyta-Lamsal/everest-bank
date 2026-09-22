import { calendarService } from '@/api/services/calendar.service';

import { getQueryClient } from '@/lib/get-query-client';

import type { CalendarRead } from '@/api/services/calendar.service';

export const latestCalendarQueryKey = ['calendar', 'latest'] as const;

export async function getLatestCalendar(): Promise<CalendarRead | null> {
  const queryClient = getQueryClient();

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: latestCalendarQueryKey,
      queryFn: calendarService.getCalendars,
    });

    return data;
  } catch {
    return null;
  }
}
