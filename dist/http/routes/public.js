import { loginRoute } from './user/login.js';
import { registerRoute } from './user/register.js';
export const publicRoutes = (app) => {
    app.register(registerRoute);
    app.register(loginRoute);
};
