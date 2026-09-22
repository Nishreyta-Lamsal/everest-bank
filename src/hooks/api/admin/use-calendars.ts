import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { calendarService } from '@/api/services/admin/calendar.service';

import type {
  CalendarWrite,
  ListCalendarsParams,
} from '@/api/services/admin/calendar.service';

export function calendarsQueryKey(params?: ListCalendarsParams) {
  return ['calendars', 'list', params ?? {}] as const;
}

export function useCalendars(params?: ListCalendarsParams) {
  return useQuery({
    queryKey: calendarsQueryKey(params),
    queryFn: () => calendarService.list(params),
  });
}

export function useCreateCalendar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CalendarWrite) => calendarService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['calendars'] });
      toast.success('Calendar created.');
    },
    onError: () => {
      toast.error('Could not create the calendar. Please try again.');
    },
  });
}

export function useUpdateCalendar(calendarId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CalendarWrite>) =>
      calendarService.update(calendarId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['calendars'] });
      toast.success('Calendar updated.');
    },
    onError: () => {
      toast.error('Could not update the calendar. Please try again.');
    },
  });
}

export function useDeleteCalendar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => calendarService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['calendars'] });
      toast.success('Calendar deleted.');
    },
    onError: () => {
      toast.error('Could not delete the calendar. Please try again.');
    },
  });
}
