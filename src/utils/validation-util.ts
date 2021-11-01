import { z } from 'zod';

export const zodIs = <T>(value: unknown, schema: z.ZodSchema<T>): value is T => {
  return schema.safeParse(value).success;
};
