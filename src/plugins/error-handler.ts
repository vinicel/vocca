import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '../errors';

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export function errorHandler(
  error: FastifyError | AppError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    } satisfies ErrorResponse);
  }

  if ('validation' in error && error.validation) {
    return reply.status(400).send({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
      },
    } satisfies ErrorResponse);
  }

  return reply.status(500).send({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
  } satisfies ErrorResponse);
}
