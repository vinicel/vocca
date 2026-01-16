export interface HealthcareProConfig {
  timeout?: number;
}

interface BaseResponse {
  success: boolean;
}

interface ListResponse<T> extends BaseResponse {
  data: T[];
  timestamp: string;
  total: number;
}

interface SingleResponse<T> extends BaseResponse {
  data: T;
  message: string;
}

export interface HealthcareProPatientData {
  id: string;
  full_name: string;
  email: string;
  contact_phone: string;
  date_of_birth: string;
  gender: string;
  street_address: string;
  city: string;
  postal_code: string;
  patient_number: string;
  registered_date: string;
}

export interface HealthcareProPatientInput {
  city: string | undefined;
  contact_phone: string;
  date_of_birth: string;
  email: string;
  full_name: string;
  gender: string | undefined;
  postal_code: string | undefined;
  street_address: string | undefined;
}

export type GetHealthcareProPatientResponse =
  ListResponse<HealthcareProPatientData>;
export type CreateHealthcareProPatientResponse =
  SingleResponse<HealthcareProPatientData>;

export interface HealthcareProAppointmentData {
  appointment_id: string;
  created: string;
  datetime: string;
  length_minutes: number;
  notes: string;
  patient_id: string;
  practitioner: string;
  type: string;
}

export interface HealthcareProCreateAppointmentInput {
  datetime: string;
  length_minutes: number;
  notes: string;
  practitioner: string;
  type: string;
  patient_id: string;
}

export interface HealthcareProUpdateAppointmentInput {
  datetime?: string;
  length_minutes?: number;
  notes?: string;
  practitioner?: string;
  type?: string;
}

export type GetHealthcareProAppointmentsResponse =
  ListResponse<HealthcareProAppointmentData>;
export type HealthcareProAppointmentResponse =
  SingleResponse<HealthcareProAppointmentData>;
