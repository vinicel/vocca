export interface HttpRequestConfig {
  timeout: number;
  baseUrl: string;
  endpoint: string;
  options?: RequestInit;
  getHeaders: () => Promise<Record<string, string>> | Record<string, string>;
}

export interface ApiErrorInfo {
  code: string;
  message: string;
}

export function parseHttpError(
  statusCode: number,
  errorBody: unknown,
): ApiErrorInfo {
  const parsed = errorBody as {
    code?: string;
    error?: string;
    message?: string;
    error_description?: string;
  } | null;

  let code = parsed?.code || 'UNKNOWN_ERROR';
  if (code === 'UNKNOWN_ERROR') {
    if (statusCode === 404) code = 'NOT_FOUND';
    else if (statusCode === 401) code = 'UNAUTHORIZED';
    else if (statusCode === 400) code = 'BAD_REQUEST';
  }

  const message =
    parsed?.message ||
    parsed?.error_description ||
    parsed?.error ||
    `HTTP error: ${statusCode}`;

  return { code, message };
}

export async function httpRequest<T>(config: HttpRequestConfig): Promise<T> {
  const { timeout, baseUrl, endpoint, options = {}, getHeaders } = config;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const error = parseHttpError(response.status, errorBody);
      throw new Error(`[${error.code}] ${error.message}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function httpRequestText(
  config: HttpRequestConfig,
): Promise<string> {
  const { timeout, baseUrl, endpoint, options = {}, getHeaders } = config;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
      signal: controller.signal,
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
