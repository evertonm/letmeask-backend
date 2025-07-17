import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../../../utils/jwt-key.js';
export const refreshRoute = (app) => {
    app.post('/users/refresh', (request, reply) => {
        const { refreshToken } = request.body;
        if (!refreshToken) {
            return reply.status(401).send({ message: 'No refresh token provided.' });
        }
        try {
            const decoded = jwt.verify(refreshToken, getJwtSecret());
            const newToken = jwt.sign({ id: decoded }, getJwtSecret(), {
                expiresIn: '1h', // Novo JWT expira em 1 hora
            });
            reply.send({ token: newToken });
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                return reply.status(401).send({ message: 'Refresh token expired.' });
            }
            return reply.status(401).send({ message: 'Invalid refresh token.' });
        }
    });
};
