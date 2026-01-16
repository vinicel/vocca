import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { patientRoutes } from './patients';
import { healthRoutes } from './health';
import { availabilitiesRoutes } from './availabilities';
import { appointmentsRoutes } from './appointments';
import { hl7Routes } from './hl7';

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.register(healthRoutes, { prefix: '/health' });
  fastify.register(patientRoutes, { prefix: '/patients' });
  fastify.register(availabilitiesRoutes, { prefix: '/availabilities' });
  fastify.register(appointmentsRoutes, { prefix: '/appointments' });
  fastify.register(hl7Routes, { prefix: '/hl7' });
}
