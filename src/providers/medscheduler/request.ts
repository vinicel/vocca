import { generateHmacSignature } from './auth';
import { httpRequest } from '../shared/http-client';

const BASE_URL = 'https://medscheduler-api.onrender.com';

export async function request<T>(
  timeout: number,
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  return httpRequest<T>({
    timeout,
    baseUrl: BASE_URL,
    endpoint,
    options,
    getHeaders: () =>
      generateHmacSignature(
        endpoint,
        options.method || 'GET',
        options.body as string | undefined,
      ),
  });
}
