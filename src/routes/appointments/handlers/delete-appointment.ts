import { FastifyReply, FastifyRequest } from 'fastify';
import { IProviderClient } from '../../../providers/provider-client.interface';
import {
  AppointmentIdParams,
  DeleteAppointmentResponse,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function deleteAppointmentHandler(client: IProviderClient) {
  return async (
    request: FastifyRequest<{ Params: AppointmentIdParams }>,
    reply: FastifyReply,
  ): Promise<ApiSuccessResponse<DeleteAppointmentResponse>> => {
    try {
      const { appointmentId } = request.params;
      await client.deleteAppointment(appointmentId);
      return reply
        .status(200)
        .send(successResponse({ appointmentId, deleted: true }));
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
