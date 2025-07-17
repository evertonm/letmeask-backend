import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.js';
import { privateRoutes } from './http/routes/private.js';
import { publicRoutes } from './http/routes/public.js';
import 'dotenv/config';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyMultipart);

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'OK';
});

app.register(publicRoutes);
app.register(privateRoutes);

const port = Number(process.env.PORT) || 3000;

app.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on port ${port}`);
});
