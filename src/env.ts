import { z } from 'zod';

console.log('process.env.DATABASE_URL:', process.env.DATABASE_URL);

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  GEMINI_API_KEY: z.string(),
  JWT_SECRET: z.string().min(64),
});

export const env = envSchema.parse(process.env);
