import { FastifyRequest } from 'fastify';
import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import {
  Availability,
  GetAvailabilitiesQuery,
  listResponse,
  ApiListResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function getAvailabilitiesHandler(client: ProviderClientInterface) {
  return async (
    request: FastifyRequest<{ Querystring: GetAvailabilitiesQuery }>,
  ): Promise<ApiListResponse<Availability>> => {
    try {
      const { search = '' } = request.query;
      const availabilities = await client.getAvailabilities(search);
      return listResponse(availabilities);
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
