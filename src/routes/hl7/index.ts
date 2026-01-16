import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getProviderClient,
  getProviderFromDb,
} from '../../services/provider-registry';
import { sendHl7AdtHandler, getHl7SampleHandler } from './handlers';

export async function hl7Routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const provider = await getProviderFromDb();
  const client = getProviderClient(provider);

  fastify.post('/ADT', {
    config: {
      rawBody: true,
    },
    handler: sendHl7AdtHandler(client),
  });

  fastify.get('/sample', {
    handler: getHl7SampleHandler(client),
  });
}
