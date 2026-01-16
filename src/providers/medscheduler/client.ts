import {
  Patient,
  Availability,
  Appointment,
  UpdateAppointmentInput,
} from '../../domain/schemas';
import {
  ProviderClientInterface,
  HealthResponse,
} from '../provider-client.interface';
import {
  reshapePatientToProviderFormat,
  reshapeCreatedPatientFromProviderFormat,
  reshapeCreateAppointmentToProviderFormat,
  reshapeUpdateAppointmentToProviderFormat,
  reshapeAppointmentFromProviderFormat,
  reshapeAppointmentsFromProviderFormat,
} from './reshaper';
import {
  CreateMedSchedulerPatientResponse,
  MedSchedulerAppointmentResponse,
  GetMedSchedulerAppointmentsResponse,
  MedSchedulerConfig,
} from './types';
import { request } from './request';

export function buildMedSchedulerClient(
  config: MedSchedulerConfig,
): ProviderClientInterface {
  const { timeout = 10000 } = config;

  async function health(): Promise<HealthResponse> {
    return request<HealthResponse>(timeout, '/health');
  }

  async function getPatients(
    _search?: string,
    _active?: boolean,
  ): Promise<Patient[]> {
    return request<Patient[]>(timeout, `/patients`);
  }

  async function createPatient(patient: Patient): Promise<Patient> {
    const patientInputReshaped = reshapePatientToProviderFormat(patient);
    const patientResponse = await request<CreateMedSchedulerPatientResponse>(
      timeout,
      '/patients',
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
    const appointmentResponse = await request<MedSchedulerAppointmentResponse>(
      timeout,
      `/appointments/${appointmentId}`,
    );
    return reshapeAppointmentFromProviderFormat(appointmentResponse);
  }

  async function getAppointments(
    date?: string,
    _status?: string,
    _patientId?: string,
  ): Promise<Appointment[]> {
    const params = new URLSearchParams();
    if (date) {
      params.append('date', date);
    }
    const appointmentsResponse =
      await request<GetMedSchedulerAppointmentsResponse>(
        timeout,
        `/appointments?${params.toString()}`,
      );
    return reshapeAppointmentsFromProviderFormat(appointmentsResponse);
  }

  async function createAppointment(
    appointment: Appointment,
  ): Promise<Appointment> {
    const appointmentInputReshaped =
      reshapeCreateAppointmentToProviderFormat(appointment);
    const appointmentResponse = await request<MedSchedulerAppointmentResponse>(
      timeout,
      '/appointments',
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
    const appointmentResponse = await request<MedSchedulerAppointmentResponse>(
      timeout,
      `/appointments/${appointmentId}`,
      {
        method: 'PUT',
        body: JSON.stringify(appointmentInputReshaped),
      },
    );

    return reshapeAppointmentFromProviderFormat(appointmentResponse);
  }

  async function deleteAppointment(_appointmentId: string): Promise<void> {
    // MedScheduler API does not support appointment deletion
    throw new Error(
      '[NOT_SUPPORTED] Appointment deletion is not available with the MedScheduler provider',
    );
  }

  async function getAvailabilities(search: string): Promise<Availability[]> {
    return request<Availability[]>(
      timeout,
      `/availabilities?search=${encodeURIComponent(search)}`,
    );
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
  };
}
