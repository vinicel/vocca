import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getProviderClient,
  getProviderFromDb,
} from '../../services/provider-registry';
import { getPatientsHandler, createPatientHandler } from './handlers';
import { PatientSchema } from '../../domain/schemas';

export async function patientRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const provider = await getProviderFromDb();
  const client = getProviderClient(provider);

  fastify.get('/', {
    handler: getPatientsHandler(client),
  });

  fastify.post('/', {
    schema: {
      body: PatientSchema,
    },
    handler: createPatientHandler(client),
  });
}
