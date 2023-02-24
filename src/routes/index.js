import express from 'express';
import categoryRoutes from './api/category.routes.js';
import productRoutes from './api/product.routes.js';
import userRoutes from './api/user.routes.js';
import welcomeRoutes from './api/welcome.routes.js';
import cartRoutes from './api/cart.routes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/cart', cartRoutes);

export default routes;
