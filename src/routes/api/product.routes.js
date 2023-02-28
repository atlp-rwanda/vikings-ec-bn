import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {
  createProduct,
  getAllProducts,
  removeExpiredProducts,
  getSpecificProduct,
  markAvailableProduct,
  updateProduct,
  deleteProduct 
} from '../../controllers/product.controller.js';
import productValidation from '../../validations/product/product.validation';
import validateAvailable from '../../validations/product/isAvailable.validation';
import { checkIfCategoryExistById } from '../../middlewares/category.middleware';
import {WishlistController} from '../../controllers/wishlist.controller';
import {
  checkExtensions,
  checkIfProductExists,
  checkIfProductExistsById,
  checkIfProductIsAvailableById,
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
  restrictTo('seller', 'admin'),
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  removeExpiredProducts,
)
productRoutes.get('/', 
  protectRoute,  
  validateSearchCriteria, 
  receivedQueryFormat,
  searchProductController,
  removeExpiredProducts
);

productRoutes.get(
  '/:productId',
  protectRoute,
  checkIfProductExistsById,
  checkIfProductIsAvailableById,
  checkIfSellerOwnsProduct,
  getSpecificProduct
);
productRoutes.patch('/:productId',
  protectRoute,
  restrictTo('seller', 'admin'),
  productValidation,
  checkIfProductExistsById,
  checkIfSellerOwnsProduct,
  updateProduct,
  
);

productRoutes.put(
  '/:productId',
  protectRoute,
  restrictTo('seller','admin'),
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
    checkIfProductExistsById,
    checkIfSellerOwnsProduct,
    deleteProduct
  );

export default productRoutes;
