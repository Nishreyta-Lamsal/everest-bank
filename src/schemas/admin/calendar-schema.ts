import { z } from 'zod';

export const calendarSchema = z.object({
  year: z.number({ error: 'Year is required' }).int(),
  title: z.string().min(1, 'Title is required'),
  is_active: z.boolean(),
});

export type CalendarFormValues = z.infer<typeof calendarSchema>;
