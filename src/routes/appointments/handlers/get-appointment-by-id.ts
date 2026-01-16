import { FastifyRequest } from 'fastify';
import { IProviderClient } from '../../../providers/provider-client.interface';
import {
  Appointment,
  AppointmentIdParams,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function getAppointmentByIdHandler(client: IProviderClient) {
  return async (
    request: FastifyRequest<{ Params: AppointmentIdParams }>,
  ): Promise<ApiSuccessResponse<Appointment>> => {
    try {
      const { appointmentId } = request.params;
      const appointment = await client.getAppointmentById(appointmentId);
      return successResponse(appointment);
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
