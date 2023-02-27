import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {
  createProduct,
  getAllProducts,
  removeExpiredProducts
} from '../../controllers/product.controller.js';
import productValidation from '../../validations/product/product.validation';
import { checkIfCategoryExistById } from '../../middlewares/category.middleware';
import {
  checkExtensions,
  checkIfProductExists,
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  checkNumberOfImages,
  uploadImages,
  receivedQueryFormat,
} from '../../middlewares/product.middleware';
import { validateSearchCriteria } from '../../validations/product/searchProduct.validate.js';
import { searchProductController } from '../../controllers/product.controller.js';

const productRoutes = express.Router();
productRoutes.post(
  '/',
  protectRoute,
  restrictTo('seller', 'admin'),
  productValidation,
  checkIfCategoryExistById,
  checkIfProductExists,
  checkNumberOfImages,
  checkExtensions('.jpg', '.png', '.webp', '.jpeg', '.gif'),
  uploadImages,
  createProduct
);
productRoutes.patch(
  '/:productId/expired',
  protectRoute,
  restrictTo('seller','admin'),
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  removeExpiredProducts,
)
productRoutes.get('/', 
  protectRoute,  
  validateSearchCriteria, 
  receivedQueryFormat,
  searchProductController,
);

export default productRoutes;
