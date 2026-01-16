import { FastifyRequest } from 'fastify';
import { IProviderClient } from '../../../providers/provider-client.interface';
import {
  Appointment,
  UpdateAppointmentInput,
  AppointmentIdParams,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function updateAppointmentHandler(client: IProviderClient) {
  return async (
    request: FastifyRequest<{
      Params: AppointmentIdParams;
      Body: UpdateAppointmentInput;
    }>,
  ): Promise<ApiSuccessResponse<Appointment>> => {
    try {
      const { appointmentId } = request.params;
      const updatedAppointment = await client.updateAppointment(
        appointmentId,
        request.body,
      );
      return successResponse(updatedAppointment);
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
