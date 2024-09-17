import { z } from 'zod';

export const envVarSchema = z.object({
  NODE_ENV: z
    .enum(['dev', 'test', 'production'], {
      message:
        'It must be a valid environment. Expected: "dev", "test", "production".',
    })
    .default('dev'),
  PORT: z.coerce
    .number({ message: 'It must be a valid value for PORT.' })
    .default(3333),
});
