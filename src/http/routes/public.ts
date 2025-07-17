import type { FastifyPluginCallback } from 'fastify';
import { loginRoute } from './user/login.js';
import { registerRoute } from './user/register.js';

export const publicRoutes: FastifyPluginCallback = (app) => {
  app.register(registerRoute);
  app.register(loginRoute);
};
