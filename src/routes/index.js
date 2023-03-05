import express from 'express';
import categoryRoutes from './api/category.routes.js';
import productRoutes from './api/product.routes.js';
import chatRoutes from './api/chat.routes.js';
import userRoutes from './api/user.routes.js';
import welcomeRoutes from './api/welcome.routes.js';
import cartRoutes from './api/cart.routes.js';
import notificationRoutes from './api/notification.routes.js';

const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/chats', chatRoutes);
routes.use('/carts', cartRoutes);
routes.use('/notifications', notificationRoutes);
export default routes;
