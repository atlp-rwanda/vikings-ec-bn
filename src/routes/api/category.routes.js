import express from 'express';
import { addCategory } from '../../controllers/category.controller';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { checkIfCategoryExistsByName } from '../../middlewares/category.middleware';
import categoryValidation from '../../validations/product/category.validation';

const categoryRoutes = express.Router();
categoryRoutes.post(
  '/',
  protectRoute,
  restrictTo('seller','admin'),
  categoryValidation,
  checkIfCategoryExistsByName,
  addCategory
);

export default categoryRoutes;
