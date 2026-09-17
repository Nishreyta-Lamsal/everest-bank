import { z } from 'zod';

export const mediaUploadSchema = z.object({
  file: z.instanceof(File, { error: 'Please select a file to upload.' }),
  title: z.string().optional(),
  altText: z.string().optional(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  folder: z.string().optional(),
});

export type MediaUploadFormValues = z.infer<typeof mediaUploadSchema>;
