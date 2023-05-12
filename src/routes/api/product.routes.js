import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {
  createProduct,
  removeExpiredProducts,
  getSpecificProduct,
  markAvailableProduct,
  updateProduct,
  deleteProduct,
  recommendProducts
} from '../../controllers/product.controller.js';
import { productValidation } from '../../validations/product/product.validation';
import validateAvailable from '../../validations/product/isAvailable.validation';
import { checkIfCategoryExistById } from '../../middlewares/category.middleware';
import {
  checkExtensions,
  checkIfProductExists,
  checkIfProductExistsById,
  checkIfProductIsAvailableById,
  checkIfSellerOwnsProduct,
  checkNumberOfImages,
  uploadImages,
  receivedQueryFormat,
  checkExpirationDate,
  checkIfImageChanged,
  uploadChangedImages
} from '../../middlewares/product.middleware';
import { validateSearchCriteria } from '../../validations/product/searchProduct.validate.js';
import { searchProductController } from '../../controllers/product.controller.js';
import { uuidValidation } from '../../validations/user/userId.validation';
const productRoutes = express.Router();
productRoutes.post(
  '/',
  protectRoute,
  restrictTo('seller', 'admin'),
  productValidation,
  checkIfCategoryExistById,
  checkExpirationDate,
  checkIfProductExists,
  checkNumberOfImages,
  checkExtensions('.jpg', '.png', '.webp', '.jpeg', '.gif'),
  uploadImages,
  createProduct
);
productRoutes.patch(
  '/:productId/expired',
  protectRoute,
  restrictTo('seller', 'admin'),
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  removeExpiredProducts,
);
productRoutes.get('/',
  protectRoute,
  validateSearchCriteria,
  receivedQueryFormat,
  searchProductController,
  removeExpiredProducts
);

productRoutes.get(
  '/recommended',
  protectRoute,
  recommendProducts
);

productRoutes.get(
  '/:productId',
  protectRoute,
  uuidValidation('productId'),
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  getSpecificProduct
);
productRoutes.patch('/:productId',
  protectRoute,
  restrictTo('seller', 'admin'),
  productValidation,
  checkIfCategoryExistById,
  checkExpirationDate,
  uuidValidation('productId'),
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  checkIfImageChanged,
  uploadChangedImages,
  updateProduct
);

productRoutes.put(
  '/:productId',
  protectRoute,
  restrictTo('seller', 'admin'),
  uuidValidation('productId'),
  validateAvailable,
  checkIfProductExistsById,
  checkIfProductIsAvailableById,
  checkIfSellerOwnsProduct,
  markAvailableProduct,
);

productRoutes.delete(
  '/:productId',
  protectRoute,
  restrictTo('seller', 'admin'),
  uuidValidation('productId'),
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  deleteProduct
);

export default productRoutes;
