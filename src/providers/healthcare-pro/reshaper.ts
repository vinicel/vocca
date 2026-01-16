import {
  Appointment,
  Patient,
  UpdateAppointmentInput,
} from '../../domain/schemas';
import {
  CreateHealthcareProPatientResponse,
  GetHealthcareProAppointmentsResponse,
  GetHealthcareProPatientResponse,
  HealthcareProAppointmentResponse,
  HealthcareProPatientInput,
  HealthcareProCreateAppointmentInput,
  HealthcareProUpdateAppointmentInput,
} from './types';
import { parseDateOfBirth, parseFullName } from './utils';

export function reshapePatientToProviderFormat(
  patient: Patient,
): HealthcareProPatientInput {
  return {
    city: patient.city,
    contact_phone: patient.phone,
    date_of_birth: patient.birthDate,
    email: patient.email,
    full_name: `${patient.firstName} ${patient.lastName}`,
    gender: patient.gender,
    postal_code: patient.postalCode,
    street_address: patient.address,
  };
}

export function reshapePatientsFromProviderFormat(
  response: GetHealthcareProPatientResponse,
): Patient[] {
  return response.data.map((patient) => {
    const { firstName, lastName } = parseFullName(patient.full_name);
    return {
      patientId: patient.id,
      firstName,
      lastName,
      email: patient.email,
      phone: patient.contact_phone,
      birthDate: parseDateOfBirth(patient.date_of_birth),
      gender: patient.gender,
      address: patient.street_address,
      city: patient.city,
      postalCode: patient.postal_code,
    };
  });
}

export function reshapeCreatedPatientFromProviderFormat(
  patientResponse: CreateHealthcareProPatientResponse,
): Patient {
  const { firstName, lastName } = parseFullName(patientResponse.data.full_name);
  return {
    patientId: patientResponse.data.id,
    firstName,
    lastName,
    email: patientResponse.data.email,
    phone: patientResponse.data.contact_phone,
    birthDate: parseDateOfBirth(patientResponse.data.date_of_birth),
    gender: patientResponse.data.gender,
    address: patientResponse.data.street_address,
    city: patientResponse.data.city,
    postalCode: patientResponse.data.postal_code,
  };
}

export function reshapeCreateAppointmentToProviderFormat(
  appointment: Appointment,
): HealthcareProCreateAppointmentInput {
  return {
    datetime: appointment.appointmentDate,
    length_minutes: appointment.duration,
    notes: appointment.reason,
    practitioner: appointment.practitioner,
    type: appointment.type,
    patient_id: appointment.patientId,
  };
}

export function reshapeAppointmentsFromProviderFormat(
  response: GetHealthcareProAppointmentsResponse,
): Appointment[] {
  return response.data.map((appointment) => ({
    appointmentId: appointment.appointment_id,
    patientId: appointment.patient_id,
    createdAt: appointment.created,
    appointmentDate: appointment.datetime,
    duration: appointment.length_minutes,
    reason: appointment.notes,
    practitioner: appointment.practitioner,
    type: appointment.type,
  }));
}

export function reshapeAppointmentFromProviderFormat(
  response: HealthcareProAppointmentResponse,
): Appointment {
  return {
    appointmentId: response.data.appointment_id,
    patientId: response.data.patient_id,
    createdAt: response.data.created,
    appointmentDate: response.data.datetime,
    duration: response.data.length_minutes,
    reason: response.data.notes,
    practitioner: response.data.practitioner,
    type: response.data.type,
  };
}

export function reshapeUpdateAppointmentToProviderFormat(
  appointment: UpdateAppointmentInput,
): HealthcareProUpdateAppointmentInput {
  return {
    datetime: appointment.appointmentDate,
    length_minutes: appointment.duration,
    notes: appointment.reason,
    practitioner: appointment.practitioner,
    type: appointment.type,
  };
}
