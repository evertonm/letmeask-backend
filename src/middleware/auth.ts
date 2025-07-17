import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../utils/jwt-key.ts';

export const authMiddleware = async (
  request: FastifyRequest & { user?: string | jwt.JwtPayload },
  reply: FastifyReply
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    request.user = decoded;
  } catch (_error) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    return reply.status(401).send({ message: 'Invalid or expired token.' });
  }
};
