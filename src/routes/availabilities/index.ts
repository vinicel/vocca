import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getProviderClient,
  getProviderFromDb,
} from '../../services/provider-registry';
import { getAvailabilitiesHandler } from './handlers';

export async function availabilitiesRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const provider = await getProviderFromDb();
  const client = getProviderClient(provider);

  fastify.get('/', {
    handler: getAvailabilitiesHandler(client),
  });
}
