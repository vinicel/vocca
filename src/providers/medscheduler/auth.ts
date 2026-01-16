import { createHmac } from 'crypto';

export function generateHmacSignature(
  endpoint: string,
  method: string,
  body?: string,
): Record<string, string> {
  const apiSecret = process.env.MEDSCHEDULER_API_KEY || '';
  const clientId = process.env.MEDSCHEDULER_CLIENT_ID || '';
  const bodyString = body || '';
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const stringToSign = `${method}\n${endpoint}\n${timestamp}\n${bodyString}`;

  const signature = createHmac('sha256', apiSecret)
    .update(stringToSign, 'utf8')
    .digest('base64');
  return {
    'X-API-Key': apiSecret,
    'X-Client-ID': clientId,
    'X-Timestamp': timestamp,
    'X-Signature': signature,
    'Content-Type': 'application/json',
  };
}
