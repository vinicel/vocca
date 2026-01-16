import { ProviderClientInterface } from '../../../providers/provider-client.interface';
import { successResponse, ApiSuccessResponse } from '../../../domain/schemas';
import { NotSupportedError, parseProviderError } from '../../../errors';

interface Hl7SampleResponse {
  sample: string;
}

export function getHl7SampleHandler(client: ProviderClientInterface) {
  return async (): Promise<ApiSuccessResponse<Hl7SampleResponse>> => {
    try {
      if (!client.getHl7Sample) {
        throw new NotSupportedError('HL7 sample endpoint');
      }

      const sample = await client.getHl7Sample();
      return successResponse({ sample });
    } catch (error) {
      throw parseProviderError(error);
    }
  };
}
