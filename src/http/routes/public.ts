import type { FastifyPluginCallback } from 'fastify';
import { loginRoute } from './user/login.ts';
import { registerRoute } from './user/register.ts';

export const publicRoutes: FastifyPluginCallback = (app) => {
  app.register(registerRoute);
  app.register(loginRoute);
};
