import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {
  createProduct,
  getAllProducts,
} from '../../controllers/product.controller.js';
import productValidation from '../../validations/product/product.validation';
import { checkIfCategoryExistById } from '../../middlewares/category.middleware';
import {
  checkExtensions,
  checkIfProductExists,
  checkNumberOfImages,
  uploadImages,
} from '../../middlewares/product.middleware';

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

productRoutes.get('/', protectRoute, getAllProducts);
export default productRoutes;
