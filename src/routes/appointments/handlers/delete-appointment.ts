import { FastifyReply, FastifyRequest } from 'fastify';
import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import {
  AppointmentIdParams,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

interface DeleteAppointmentResponse {
  appointmentId: string;
  deleted: true;
}

export function deleteAppointmentHandler(client: ProviderClientInterface) {
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
