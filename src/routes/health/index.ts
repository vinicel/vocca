import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getProviderClient,
  getProviderFromDb,
} from '../../services/provider-registry';
import { healthHandler } from './handlers';

export async function healthRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const provider = await getProviderFromDb();
  const client = getProviderClient(provider);

  fastify.get('/', {
    handler: healthHandler(client),
  });
}
