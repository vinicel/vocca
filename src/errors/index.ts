export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with id '${id}' not found`
      : `${resource} not found`;
    super(message, 404, 'NOT_FOUND');
  }
}

export class NotSupportedError extends AppError {
  constructor(operation: string, provider?: string) {
    const message = provider
      ? `${operation} is not supported by ${provider} provider`
      : `${operation} is not supported`;
    super(message, 501, 'NOT_SUPPORTED');
  }
}

export class ProviderError extends AppError {
  constructor(message: string, code = 'PROVIDER_ERROR') {
    super(message, 502, code);
  }
}

export function parseProviderError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    const match = error.message.match(/^\[([A-Z_]+)]\s*(.+)$/);
    if (match) {
      const [, code, message] = match;
      if (code === 'NOT_SUPPORTED') {
        return new NotSupportedError(message);
      }
      if (code === 'NOT_FOUND') {
        return new NotFoundError(message);
      }
      return new ProviderError(message, code);
    }
    return new AppError(error.message, 500, 'INTERNAL_ERROR');
  }

  return new AppError('An unexpected error occurred', 500, 'INTERNAL_ERROR');
}
