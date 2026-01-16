export interface MedSchedulerConfig {
  timeout?: number;
}

interface MedSchedulerPatientData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birthdate: string;
  created_at: string;
}

export interface MedSchedulerPatientInput {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birthdate: string;
}

export interface CreateMedSchedulerPatientResponse
  extends MedSchedulerPatientData {}

interface MedSchedulerAppointmentData {
  id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  reason: string;
  doctor_name: string;
  type?: string;
  created_at: string;
}

export interface MedSchedulerCreateAppointmentInput {
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  reason: string;
  doctor_name: string;
}

export interface MedSchedulerUpdateAppointmentInput {
  appointment_date?: string;
  appointment_time?: string;
  duration?: number;
  reason?: string;
  doctor_name?: string;
}

export interface GetMedSchedulerAppointmentsResponse {
  appointments: MedSchedulerAppointmentData[];
  total: number;
}

export interface MedSchedulerAppointmentResponse
  extends MedSchedulerAppointmentData {}
