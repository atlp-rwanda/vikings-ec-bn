import express from 'express';
import {
	addCategory,
	getCategories,
} from '../../controllers/category.controller';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { checkIfCategoryExistsByName } from '../../middlewares/category.middleware';
import categoryValidation from '../../validations/product/category.validation';

const categoryRoutes = express.Router();
categoryRoutes
	.route('/')
	.post(
		protectRoute,
		restrictTo('seller', 'admin'),
		categoryValidation,
		checkIfCategoryExistsByName,
		addCategory

	)
	.get(protectRoute, restrictTo('buyer','seller', 'admin'), getCategories);

export default categoryRoutes;
