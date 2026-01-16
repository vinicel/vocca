import {
  IProviderClient,
  HealthResponse,
} from '../../../providers/provider-client.interface';
import { successResponse, ApiSuccessResponse } from '../../../domain/schemas';
import { parseProviderError } from '../../../errors';

export function healthHandler(client: IProviderClient) {
  return async (): Promise<ApiSuccessResponse<HealthResponse>> => {
    try {
      const health = await client.health();
      return successResponse(health);
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
