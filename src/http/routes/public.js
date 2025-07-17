import { loginRoute } from './user/login.ts';
import { registerRoute } from './user/register.ts';
export const publicRoutes = (app) => {
    app.register(registerRoute);
    app.register(loginRoute);
};
