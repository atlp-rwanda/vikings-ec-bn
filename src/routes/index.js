import express from 'express';
import userRoutes from './api/user.routes.js';
import welcomeRoutes from './api/welcome.routes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);

export default routes;
