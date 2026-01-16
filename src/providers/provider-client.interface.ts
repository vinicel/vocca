import {
  Patient,
  Availability,
  Appointment,
  UpdateAppointmentInput,
} from '../domain/schemas';

export interface HealthResponse {
  status: string;
  version: string;
}

export interface ProviderClientInterface {
  health(): Promise<HealthResponse>;
  getPatients(search?: string, active?: boolean): Promise<Patient[]>;
  createPatient(patient: Patient): Promise<Patient>;
  getAppointmentById(appointmentId: string): Promise<Appointment>;
  getAppointments(
    date?: string,
    status?: string,
    patientId?: string,
  ): Promise<Appointment[]>;
  createAppointment(appointment: Appointment): Promise<Appointment>;
  updateAppointment(
    appointmentId: string,
    appointmentData: UpdateAppointmentInput,
  ): Promise<Appointment>;
  deleteAppointment(appointmentId: string): Promise<void>;
  getAvailabilities(search: string): Promise<Availability[]>;
  // HL7 methods (optional - only available for healthcare-pro provider)
  sendHl7Adt?(message: string): Promise<string>;
  getHl7Sample?(): Promise<string>;
}
