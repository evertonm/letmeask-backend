import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string(),
    GEMINI_API_KEY: z.string(),
    JWT_SECRET: z.string(),
    PORT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
