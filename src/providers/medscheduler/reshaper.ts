import {
  Patient,
  Appointment,
  UpdateAppointmentInput,
} from '../../domain/schemas';
import {
  CreateMedSchedulerPatientResponse,
  MedSchedulerAppointmentResponse,
  GetMedSchedulerAppointmentsResponse,
  MedSchedulerPatientInput,
  MedSchedulerCreateAppointmentInput,
  MedSchedulerUpdateAppointmentInput,
} from './types';

export function reshapePatientToProviderFormat(
  patient: Patient,
): MedSchedulerPatientInput {
  return {
    first_name: patient.firstName,
    last_name: patient.lastName,
    email: patient.email,
    phone_number: patient.phone,
    birthdate: patient.birthDate,
  };
}

export function reshapeCreatedPatientFromProviderFormat(
  patientResponse: CreateMedSchedulerPatientResponse,
): Patient {
  return {
    patientId: patientResponse.id,
    firstName: patientResponse.first_name,
    lastName: patientResponse.last_name,
    email: patientResponse.email,
    phone: patientResponse.phone_number,
    birthDate: patientResponse.birthdate,
  };
}

export function reshapeCreateAppointmentToProviderFormat(
  appointment: Appointment,
): MedSchedulerCreateAppointmentInput {
  const appointmentDateTime = new Date(appointment.appointmentDate);
  const appointmentDate = appointmentDateTime.toUTCString();
  const hours = appointmentDateTime.getUTCHours().toString().padStart(2, '0');
  const minutes = appointmentDateTime
    .getUTCMinutes()
    .toString()
    .padStart(2, '0');
  const appointmentTime = `${hours}:${minutes}`;

  return {
    patient_id: appointment.patientId,
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
    duration: appointment.duration,
    reason: appointment.reason,
    doctor_name: appointment.practitioner,
  };
}

export function reshapeUpdateAppointmentToProviderFormat(
  appointmentData: UpdateAppointmentInput,
): MedSchedulerUpdateAppointmentInput {
  const result: MedSchedulerUpdateAppointmentInput = {};

  if (appointmentData.appointmentDate) {
    const appointmentDateTime = new Date(appointmentData.appointmentDate);
    result.appointment_date = appointmentDateTime.toUTCString();
    const hours = appointmentDateTime.getUTCHours().toString().padStart(2, '0');
    const minutes = appointmentDateTime
      .getUTCMinutes()
      .toString()
      .padStart(2, '0');
    result.appointment_time = `${hours}:${minutes}`;
  }

  if (appointmentData.duration !== undefined) {
    result.duration = appointmentData.duration;
  }

  if (appointmentData.reason) {
    result.reason = appointmentData.reason;
  }

  if (appointmentData.practitioner) {
    result.doctor_name = appointmentData.practitioner;
  }

  return result;
}

export function reshapeAppointmentFromProviderFormat(
  appointmentResponse: MedSchedulerAppointmentResponse,
): Appointment {
  const date = new Date(appointmentResponse.appointment_date);
  const [hours, minutes] = appointmentResponse.appointment_time.split(':');
  date.setUTCHours(Number.parseInt(hours), Number.parseInt(minutes), 0, 0);

  return {
    appointmentId: appointmentResponse.id,
    patientId: appointmentResponse.patient_id,
    createdAt: appointmentResponse.created_at,
    appointmentDate: date.toISOString(),
    duration: appointmentResponse.duration,
    reason: appointmentResponse.reason,
    practitioner: appointmentResponse.doctor_name,
    type: appointmentResponse.type || 'consultation',
  };
}

export function reshapeAppointmentsFromProviderFormat(
  response: GetMedSchedulerAppointmentsResponse,
): Appointment[] {
  return response.appointments.map((appointment) =>
    reshapeAppointmentFromProviderFormat(appointment),
  );
}
