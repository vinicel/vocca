import { FastifyReply, FastifyRequest } from 'fastify';
import { IProviderClient } from '../../../providers/provider-client.interface';
import {
  Appointment,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function createAppointmentHandler(client: IProviderClient) {
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
