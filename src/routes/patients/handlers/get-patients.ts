import { FastifyRequest } from 'fastify';
import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import {
  Patient,
  GetPatientsQuery,
  listResponse,
  ApiListResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function getPatientsHandler(client: ProviderClientInterface) {
  return async (
    request: FastifyRequest<{ Querystring: GetPatientsQuery }>,
  ): Promise<ApiListResponse<Patient>> => {
    try {
      const { search = '', active } = request.query;
      const patients = await client.getPatients(search, active === 'true');
      return listResponse(patients);
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
