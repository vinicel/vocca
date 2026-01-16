import {
  Patient,
  Availability,
  Appointment,
  UpdateAppointmentInput,
} from '../../domain/schemas';
import {
  reshapeAppointmentsFromProviderFormat,
  reshapeAppointmentFromProviderFormat,
  reshapeCreateAppointmentToProviderFormat,
  reshapeCreatedPatientFromProviderFormat,
  reshapePatientsFromProviderFormat,
  reshapePatientToProviderFormat,
  reshapeUpdateAppointmentToProviderFormat,
} from './reshaper';
import {
  CreateHealthcareProPatientResponse,
  GetHealthcareProAppointmentsResponse,
  GetHealthcareProPatientResponse,
  HealthcareProAppointmentResponse,
  HealthcareProConfig,
} from './types';
import {
  ProviderClientInterface,
  HealthResponse,
} from '../provider-client.interface';
import { request, requestText } from './request';

export function buildHealthcareProClient(
  config: HealthcareProConfig,
): ProviderClientInterface {
  const { timeout = 10000 } = config;
  const baseUrl = 'https://healthcare-pro-api.onrender.com';

  async function health(): Promise<HealthResponse> {
    return request<HealthResponse>(timeout, '/health');
  }

  async function getPatients(
    search: string,
    active?: boolean,
  ): Promise<Patient[]> {
    const params = new URLSearchParams({ search });
    if (active !== undefined) {
      params.append('active', String(active));
    }
    const patientsResponse = await request<GetHealthcareProPatientResponse>(
      timeout,
      `/api/patients?${params.toString()}`,
    );

    return reshapePatientsFromProviderFormat(patientsResponse);
  }

  async function createPatient(patient: Patient): Promise<Patient> {
    const patientInputReshaped = reshapePatientToProviderFormat(patient);
    const patientResponse = await request<CreateHealthcareProPatientResponse>(
      timeout,
      '/api/patients',
      {
        method: 'POST',
        body: JSON.stringify(patientInputReshaped),
      },
    );

    return reshapeCreatedPatientFromProviderFormat(patientResponse);
  }

  async function getAppointmentById(
    appointmentId: string,
  ): Promise<Appointment> {
    const appointmentResponse = await request<HealthcareProAppointmentResponse>(
      timeout,
      `/api/appointments/${appointmentId}`,
    );

    return reshapeAppointmentFromProviderFormat(appointmentResponse);
  }

  async function getAppointments(
    date: string,
    status: string,
    patientId: string,
  ): Promise<Appointment[]> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (status) params.append('status', status);
    if (patientId) params.append('patient_id', patientId);

    const appointmentsResponse =
      await request<GetHealthcareProAppointmentsResponse>(
        timeout,
        `/api/appointments?${params.toString()}`,
      );

    return reshapeAppointmentsFromProviderFormat(appointmentsResponse);
  }

  async function createAppointment(
    appointment: Appointment,
  ): Promise<Appointment> {
    const appointmentInputReshaped =
      reshapeCreateAppointmentToProviderFormat(appointment);
    const appointmentResponse = await request<HealthcareProAppointmentResponse>(
      timeout,
      '/api/appointments',
      {
        method: 'POST',
        body: JSON.stringify(appointmentInputReshaped),
      },
    );

    return reshapeAppointmentFromProviderFormat(appointmentResponse);
  }

  async function updateAppointment(
    appointmentId: string,
    appointmentData: UpdateAppointmentInput,
  ): Promise<Appointment> {
    const appointmentInputReshaped =
      reshapeUpdateAppointmentToProviderFormat(appointmentData);
    const appointmentResponse = await request<HealthcareProAppointmentResponse>(
      timeout,
      `/api/appointments/${appointmentId}`,
      {
        method: 'PUT',
        body: JSON.stringify(appointmentInputReshaped),
      },
    );

    return reshapeAppointmentFromProviderFormat(appointmentResponse);
  }

  async function deleteAppointment(appointmentId: string): Promise<void> {
    await request<void>(timeout, `/api/appointments/${appointmentId}`, {
      method: 'DELETE',
    });
  }

  async function getAvailabilities(search: string): Promise<Availability[]> {
    const params = new URLSearchParams({ search });
    return request<Availability[]>(
      timeout,
      `/api/availabilities?${params.toString()}`,
    );
  }

  async function sendHl7Adt(message: string): Promise<string> {
    return requestText(timeout, '/hl7/ADT', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: message,
    });
  }

  async function getHl7Sample(): Promise<string> {
    return requestText(timeout, '/hl7/sample');
  }

  return {
    health,
    getPatients,
    createPatient,
    getAppointmentById,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAvailabilities,
    sendHl7Adt,
    getHl7Sample,
  };
}
