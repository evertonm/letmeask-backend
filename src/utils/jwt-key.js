import { env } from '../env.ts';
export const getJwtSecret = () => {
    const jwtToken = env.JWT_SECRET;
    if (jwtToken.length < 64) {
        throw new Error('JWT invalid.');
    }
    return jwtToken;
};
