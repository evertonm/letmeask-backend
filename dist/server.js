import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, } from 'fastify-type-provider-zod';
import { env } from './env.js';
import { privateRoutes } from './http/routes/private.js';
import { publicRoutes } from './http/routes/public.js';
console.log('Rodando com variáveis:', env);
const app = fastify().withTypeProvider();
app.register(fastifyMultipart);
app.register(fastifyCors, {
    origin: true,
});
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.get('/health', () => {
    return 'OK';
});
app.register(publicRoutes);
app.register(privateRoutes);
const port = Number(process.env.PORT) || 3000;
console.log('Starting server on port', port);
app.listen({ port }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on port ${port}`);
});
