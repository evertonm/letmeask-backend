import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, } from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { privateRoutes } from './http/routes/private.ts';
import { publicRoutes } from './http/routes/public.ts';
import 'dotenv/config';
const app = fastify().withTypeProvider();
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
app.listen({ port: env.PORT });
