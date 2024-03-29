import express from 'express';
import categoryRoutes from './api/category.routes.js';
import productRoutes from './api/product.routes.js';
import chatRoutes from './api/chat.routes.js';
import userRoutes from './api/user.routes.js';
import welcomeRoutes from './api/welcome.routes.js';
import cartRoutes from './api/cart.routes.js';
import wishlistrouter from './api/wishlist.routes.js';
import orderRoutes from './api/order.routes.js';
import salesRoutes from './api/sales.routes.js';
import notificationRoutes from './api/notification.routes.js';
import paymentRoutes from './api/payment.routes';
import statsRouter from './api/stats.routes.js';

import ratingRoutes from './api/rating.route';
const routes = express.Router();

routes.use('/', welcomeRoutes);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/chats', chatRoutes);
routes.use('/carts', cartRoutes);
routes.use('/notifications', notificationRoutes);
routes.use('/wishlist', wishlistrouter);
routes.use('/orders', orderRoutes);
routes.use('/sales', salesRoutes);
routes.use('/payments', paymentRoutes);
routes.use('/ratings', ratingRoutes);
routes.use('/products', ratingRoutes);
routes.use('/stats', statsRouter);

export default routes;
