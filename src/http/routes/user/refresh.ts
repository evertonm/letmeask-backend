import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../../../utils/jwt-key.js';

interface RefreshTokenProps {
  refreshToken: string;
}

export const refreshRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/users/refresh', (request, reply) => {
    const { refreshToken } = request.body as RefreshTokenProps;

    if (!refreshToken) {
      return reply.status(401).send({ message: 'No refresh token provided.' });
    }

    try {
      const decoded = jwt.verify(refreshToken, getJwtSecret());
      const newToken = jwt.sign({ id: decoded }, getJwtSecret(), {
        expiresIn: '1h', // Novo JWT expira em 1 hora
      });
      reply.send({ token: newToken });
    } catch (error) {
      if ((error as jwt.JsonWebTokenError).name === 'TokenExpiredError') {
        return reply.status(401).send({ message: 'Refresh token expired.' });
      }

      return reply.status(401).send({ message: 'Invalid refresh token.' });
    }
  });
};
