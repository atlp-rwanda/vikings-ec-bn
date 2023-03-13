import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { productRating } from '../../controllers/ratings.controller';

import {checkIfProductExistsById,} from '../../middlewares/product.middleware';
import { isBought, ratingMaxAndMinNumber } from '../../middlewares/ratings.middleware';
  const ratingRoute = express.Router();


  ratingRoute.post('/:productId',
  protectRoute,
  restrictTo('buyer', 'admin'),
  checkIfProductExistsById,
  ratingMaxAndMinNumber,
  // isBought,
  productRating
);

export default ratingRoute;