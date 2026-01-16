import { z } from 'zod';

export const PatientSchema = z.object({
  patientId: z.string().optional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  phone: z.string(),
  birthDate: z.string(),
  city: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
});

export type Patient = z.infer<typeof PatientSchema>;
