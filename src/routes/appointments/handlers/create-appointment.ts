import { FastifyReply, FastifyRequest } from 'fastify';
import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import {
  Appointment,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function createAppointmentHandler(client: ProviderClientInterface) {
  return async (
    request: FastifyRequest<{ Body: Appointment }>,
    reply: FastifyReply,
  ): Promise<ApiSuccessResponse<Appointment>> => {
    try {
      const appointment = await client.createAppointment(request.body);
      return reply.status(201).send(successResponse(appointment));
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
