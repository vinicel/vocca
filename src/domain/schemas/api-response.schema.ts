import { z } from 'zod';

export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  });

export const ApiListResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.literal(true),
    data: z.array(itemSchema),
    total: z.number(),
  });

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiListResponse<T> = {
  success: true;
  data: T[];
  total: number;
};

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export function successResponse<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

export function listResponse<T>(data: T[]): ApiListResponse<T> {
  return { success: true, data, total: data.length };
}
