import { FastifyRequest } from 'fastify';
import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import {
  Appointment,
  GetAppointmentsQuery,
  listResponse,
  ApiListResponse,
} from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function getAppointmentsHandler(client: ProviderClientInterface) {
  return async (
    request: FastifyRequest<{ Querystring: GetAppointmentsQuery }>,
  ): Promise<ApiListResponse<Appointment>> => {
    try {
      const { date, status, patientId } = request.query;
      const appointments = await client.getAppointments(
        date,
        status,
        patientId,
      );
      return listResponse(appointments);
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
