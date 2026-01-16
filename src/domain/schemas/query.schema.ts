import { z } from 'zod';

export const GetPatientsQuerySchema = z.object({
  search: z.string().optional(),
  active: z.string().optional(),
});

export type GetPatientsQuery = z.infer<typeof GetPatientsQuerySchema>;
