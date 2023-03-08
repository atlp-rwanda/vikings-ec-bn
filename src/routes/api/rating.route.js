import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { getRatingsBySpecificProduct, productRating } from '../../controllers/ratings.controller';

import {checkProductAvailable} from '../../middlewares/product.middleware';
import { checkIfUserBoughtProduct, validateRating } from '../../middlewares/ratings.middleware';
import { uuidValidation } from '../../validations/user/userId.validation';
  const ratingRoute = express.Router();


  ratingRoute.post('/',
  protectRoute,
  restrictTo('buyer', 'admin'),
  validateRating,
  checkProductAvailable,
  checkIfUserBoughtProduct,
  productRating
);

ratingRoute.get('/:productId/ratings',
protectRoute,
uuidValidation('productId'),
getRatingsBySpecificProduct,
);
export default ratingRoute;