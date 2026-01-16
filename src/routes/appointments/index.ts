import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getProviderClient,
  getProviderFromDb,
} from '../../services/provider-registry';
import {
  getAppointmentsHandler,
  createAppointmentHandler,
  updateAppointmentHandler,
  deleteAppointmentHandler,
  getAppointmentByIdHandler,
} from './handlers';
import {
  AppointmentSchema,
  UpdateAppointmentInputSchema,
} from '../../domain/schemas';

export async function appointmentsRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
) {
  const provider = await getProviderFromDb();
  const client = getProviderClient(provider);

  fastify.get('/', {
    handler: getAppointmentsHandler(client),
  });

  fastify.get('/:appointmentId', {
    handler: getAppointmentByIdHandler(client),
  });

  fastify.post('/', {
    schema: {
      body: AppointmentSchema,
    },
    handler: createAppointmentHandler(client),
  });

  fastify.put('/:appointmentId', {
    schema: {
      body: UpdateAppointmentInputSchema,
    },
    handler: updateAppointmentHandler(client),
  });

  fastify.delete('/:appointmentId', {
    handler: deleteAppointmentHandler(client),
  });
}
