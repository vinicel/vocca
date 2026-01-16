export {
  PatientSchema,
  type Patient,
} from './patient.schema';

export {
  AppointmentSchema,
  UpdateAppointmentInputSchema,
  GetAppointmentsQuerySchema,
  AppointmentIdParamsSchema,
  type Appointment,
  type UpdateAppointmentInput,
  type GetAppointmentsQuery,
  type AppointmentIdParams,
} from './appointment.schema';

export {
  AvailabilitySchema,
  GetAvailabilitiesQuerySchema,
  type Availability,
  type GetAvailabilitiesQuery,
} from './availability.schema';

export {
  GetPatientsQuerySchema,
  type GetPatientsQuery,
} from './query.schema';

export {
  ApiSuccessResponseSchema,
  ApiListResponseSchema,
  ApiErrorResponseSchema,
  successResponse,
  listResponse,
  type ApiSuccessResponse,
  type ApiListResponse,
  type ApiErrorResponse,
} from './api-response.schema';
