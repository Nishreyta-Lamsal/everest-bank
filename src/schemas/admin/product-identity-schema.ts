import { z } from 'zod';

export const productIdentitySchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  type: z.string().min(1, 'Type is required'),
  slug: z.string().min(1, 'Slug is required'),
  replicateFromId: z.number({ error: 'Select a product to replicate design from' }),
});

export type ProductIdentityFormValues = z.infer<typeof productIdentitySchema>;
