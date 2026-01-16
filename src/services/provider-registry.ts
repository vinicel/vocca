import { buildHealthcareProClient } from '../providers/healthcare-pro/client';
import { buildMedSchedulerClient } from '../providers/medscheduler/client';
import { IProviderClient } from '../providers/provider-client.interface';

export type ProviderType = 'healthcare-pro' | 'medscheduler';

const DEFAULT_TIMEOUT = 10000;

const clients: Record<ProviderType, IProviderClient> = {
  'healthcare-pro': buildHealthcareProClient({ timeout: DEFAULT_TIMEOUT }),
  'medscheduler': buildMedSchedulerClient({ timeout: DEFAULT_TIMEOUT }),
};

export function getProviderClient(provider: ProviderType): IProviderClient {
  const client = clients[provider];
  if (!client) {
    throw new Error(`Unknown provider: ${provider}`);
  }
  return client;
}

export async function getProviderFromDb(): Promise<ProviderType> {
  // TODO: Fetch from database
  return 'healthcare-pro';
}
