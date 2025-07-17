import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export const logoutRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/users/logout', async () => {
    return await 'Registra';
  });
};
