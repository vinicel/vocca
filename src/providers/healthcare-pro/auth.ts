interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

let cachedToken: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
} | null = null;

export async function getAccessToken(baseUrl: string): Promise<string> {
  const now = Date.now();

  if (cachedToken && cachedToken.expiresAt > now + 60000) {
    return cachedToken.accessToken;
  }

  /*if (cachedToken && cachedToken.refreshExpiresAt > now + 60000) {
    return refreshAccessToken(baseUrl, cachedToken.refreshToken);
  }*/
  const clientId = process.env.HEALTHCARE_PRO_CLIENT_ID;
  const clientSecret = process.env.HEALTHCARE_PRO_CLIENT_SECRET;
  const scope = process.env.HEALTHCARE_PRO_SCOPE;

  if (!clientId || !clientSecret || !scope) {
    throw new Error(
      'Missing required environment variables for Healthcare Pro authentication',
    );
  }

  const response = await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      scope,
    }),
  });

  if (!response.ok) {
    throw new Error(`OAuth token request failed: ${response.status}`);
  }

  const data: TokenResponse = await response.json();

  cachedToken = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + data.expires_in * 1000,
    refreshExpiresAt: now + data.refresh_expires_in * 1000,
  };

  return cachedToken.accessToken;
}

async function refreshAccessToken(
  baseUrl: string,
  refreshToken: string,
): Promise<string> {
  const response = await fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    cachedToken = null;
    throw new Error(`Refresh token failed: ${response.status}`);
  }

  const data: TokenResponse = await response.json();
  const now = Date.now();

  cachedToken = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + data.expires_in * 1000,
    refreshExpiresAt: now + data.refresh_expires_in * 1000,
  };

  return cachedToken.accessToken;
}
