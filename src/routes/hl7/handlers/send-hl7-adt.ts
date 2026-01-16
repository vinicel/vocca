import { FastifyRequest } from 'fastify';
import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import { successResponse, ApiSuccessResponse } from '../../../domain/schemas';
import { NotSupportedError, parseProviderError } from '../../../errors';

interface Hl7AdtResponse {
  ack: string;
}

export function sendHl7AdtHandler(client: ProviderClientInterface) {
  return async (
    request: FastifyRequest<{ Body: string }>,
  ): Promise<ApiSuccessResponse<Hl7AdtResponse>> => {
    try {
      if (!client.sendHl7Adt) {
        throw new NotSupportedError('HL7 ADT endpoint');
      }

      const ack = await client.sendHl7Adt(request.body);
      return successResponse({ ack });
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
