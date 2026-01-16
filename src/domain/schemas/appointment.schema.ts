import { z } from 'zod';

export const AppointmentSchema = z.object({
  appointmentId: z.string().optional(),
  patientId: z.string(),
  reason: z.string(),
  createdAt: z.string().optional(),
  type: z.string(),
  duration: z.number(),
  appointmentDate: z.string(),
  practitioner: z.string(),
});

export const UpdateAppointmentInputSchema = z.object({
  appointmentDate: z.string().optional(),
  duration: z.number().optional(),
  reason: z.string().optional(),
  practitioner: z.string().optional(),
  type: z.string().optional(),
});

export const GetAppointmentsQuerySchema = z.object({
  date: z.string().optional(),
  status: z.string().optional(),
  patientId: z.string().optional(),
});

export const AppointmentIdParamsSchema = z.object({
  appointmentId: z.string(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
export type UpdateAppointmentInput = z.infer<
  typeof UpdateAppointmentInputSchema
>;
export type GetAppointmentsQuery = z.infer<typeof GetAppointmentsQuerySchema>;
export type AppointmentIdParams = z.infer<typeof AppointmentIdParamsSchema>;
