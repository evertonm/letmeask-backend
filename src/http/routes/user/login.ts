import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import jwt from 'jsonwebtoken'; // Import correto para JWT
import { db } from '../../../db/connection.js';
import { schema } from '../../../db/schema/index.js';
import { users } from '../../../db/schema/user.js';
import { getJwtSecret } from '../../../utils/jwt-key.js';

interface LoginProps {
  username: string;
  password: string;
}

export const loginRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/users/login', async (request, reply) => {
    const { username, password } = request.body as LoginProps;

    const user = await db
      .select()
      .from(users)
      .where(eq(schema.users.username, username))
      .limit(1);
    if (!user.length) {
      return reply.status(401).send({ message: 'Invalid credentials.' });
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return reply.status(401).send({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
      },
      getJwtSecret(),
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign({ id: user[0].id }, getJwtSecret(), {
      expiresIn: '7d',
    });

    reply.send({
      token,
      refreshToken,
      user: {
        username: user[0].username,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        photoUrl: user[0].photoUrl || null,
      },
    });
  });
};
