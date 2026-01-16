import { getAccessToken } from './auth';

interface ApiErrorResponse {
  code?: string;
  error?: string;
  message?: string;
  error_description?: string;
  success?: boolean;
}

function parseApiError(
  errorText: string,
  statusCode: number,
): { code: string; message: string } {
  try {
    const parsed: ApiErrorResponse = JSON.parse(errorText);

    let code = 'UNKNOWN_ERROR';
    if (parsed.code) {
      code = parsed.code;
    } else if (statusCode === 404) {
      code = 'NOT_FOUND';
    } else if (statusCode === 401) {
      code = 'UNAUTHORIZED';
    } else if (statusCode === 400) {
      code = 'BAD_REQUEST';
    }

    const message =
      parsed.message || parsed.error_description || parsed.error || errorText;

    return { code, message };
  } catch {
    return {
      code: 'UNKNOWN_ERROR',
      message: errorText || `HTTP error: ${statusCode}`,
    };
  }
}

const baseUrl = 'https://healthcare-pro-api.onrender.com';

export async function request<T>(
  timeout: number,
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const accessToken = await getAccessToken(baseUrl);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = parseApiError(errorText, response.status);
      throw new Error(`[${error.code}] ${error.message}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function requestText(
  timeout: number,
  endpoint: string,
  options: RequestInit = {},
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const accessToken = await getAccessToken(baseUrl);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error: ${response.status} - ${errorText}`);
    }

    return response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}
