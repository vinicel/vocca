import { FastifyReply, FastifyRequest } from 'fastify';
import { IProviderClient } from '../../../providers/provider-client.interface';
import {
  Patient,
  successResponse,
  ApiSuccessResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function createPatientHandler(client: IProviderClient) {
  return async (
    request: FastifyRequest<{ Body: Patient }>,
    reply: FastifyReply,
  ): Promise<ApiSuccessResponse<Patient>> => {
    try {
      const patient = await client.createPatient(request.body);
      return reply.status(201).send(successResponse(patient));
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
