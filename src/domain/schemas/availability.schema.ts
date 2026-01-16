import { z } from 'zod';

export const AvailabilitySchema = z.object({
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  practitionerId: z.string(),
  consultationType: z.string(),
});

export const GetAvailabilitiesQuerySchema = z.object({
  search: z.string().optional(),
});

export type Availability = z.infer<typeof AvailabilitySchema>;
export type GetAvailabilitiesQuery = z.infer<
  typeof GetAvailabilitiesQuerySchema
>;
