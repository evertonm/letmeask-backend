import bcrypt from 'bcrypt';
import { eq, or } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../../db/connection.js';
import { users } from '../../../db/schema/user.js';
const registerSchema = z.object({
    username: z
        .string({ required_error: 'O campo username é obrigatório.' })
        .nonempty('O campo username não pode estar vazio.'),
    password: z
        .string({ required_error: 'O campo password é obrigatório.' })
        .nonempty('O campo password não pode estar vazio.'),
    firstName: z.string().nonempty('Nome é obrigatório.'),
    lastName: z.string().nonempty('Sobrenome é obrigatório.'),
    email: z
        .string()
        .email('O campo email deve ser um email válido.')
        .min(1, 'Email é obrigatório.'),
    photoUrl: z.string().optional(),
});
export const registerRoute = (app) => {
    app.post('/users/register', async (request, reply) => {
        try {
            const { username, password, email, firstName, lastName, photoUrl } = registerSchema.parse(request.body);
            // Check if username already exists
            const existingUser = await db
                .select()
                .from(users)
                .where(or(eq(users.username, username), eq(users.email, email)))
                .limit(1);
            if (existingUser.length > 0) {
                return reply.status(400).send({ message: 'Usuário já existe.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.insert(users).values({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                photoUrl: photoUrl || null,
            });
            reply.status(201).send({ message: 'Usuário registrado com sucesso.' });
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                return reply
                    .status(400)
                    .send({ message: error.errors.map((e) => e.message).join(', ') });
            }
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    });
};
