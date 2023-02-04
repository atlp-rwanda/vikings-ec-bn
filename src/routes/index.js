import express from 'express';
import productRoutes from './api/product.routes.js';
import userRoutes from './api/user.routes.js';
import welcomeRoutes from './api/welcome.routes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);
routes.use('/',productRoutes)

export default routes;
