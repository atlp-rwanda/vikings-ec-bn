import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { createProduct } from '../../controllers/product.controller.js';
import productValidation from '../../validations/product/product.validation';
import { addCategory } from '../../controllers/category.controller';
import { checkIfCategoryExists, checkCategory } from '../../middlewares/category.middleware';
import { checkExtensions, checkIfProductExists, checkNumberOfImages, uploadImages } from '../../middlewares/product.middleware';
import categoryValidation from '../../validations/product/category.validation';

const productRoutes = express.Router();
productRoutes.post(
  '/products',
  protectRoute,
  restrictTo('seller'),
  productValidation,
  checkCategory,
  checkIfProductExists,
  checkNumberOfImages,
  checkExtensions('jpg','png','webp','jpeg','gif'),
  uploadImages,
  createProduct
);
productRoutes.post(
  '/category',
  protectRoute,
  categoryValidation,
  checkIfCategoryExists,
  addCategory
);
export default productRoutes;
