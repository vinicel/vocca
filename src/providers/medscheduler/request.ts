import { generateHmacSignature } from './auth';

const baseUrl = 'https://medscheduler-api.onrender.com';

export async function request<T>(
  timeout: number,
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const headers = generateHmacSignature(
    endpoint,
    options.method || 'GET',
    options.body as string | undefined,
  );

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);

      let errorCode = errorBody?.code || 'UNKNOWN_ERROR';
      if (errorCode === 'UNKNOWN_ERROR') {
        if (response.status === 404) errorCode = 'NOT_FOUND';
        else if (response.status === 401) errorCode = 'UNAUTHORIZED';
        else if (response.status === 400) errorCode = 'BAD_REQUEST';
      }

      const errorMessage =
        errorBody?.message ||
        errorBody?.error ||
        `HTTP error: ${response.status}`;

      throw new Error(`[${errorCode}] ${errorMessage}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}
