import { getAccessToken } from './auth';
import {httpRequest, httpRequestText} from "../shared/http-client";

const BASE_URL = 'https://healthcare-pro-api.onrender.com';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const accessToken = await getAccessToken(BASE_URL);
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
}

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
    getHeaders: getAuthHeaders,
  });
}

export async function requestText(
  timeout: number,
  endpoint: string,
  options: RequestInit = {},
): Promise<string> {
  return httpRequestText({
    timeout,
    baseUrl: BASE_URL,
    endpoint,
    options,
    getHeaders: async () => {
      const accessToken = await getAccessToken(BASE_URL);
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    },
  });
}
