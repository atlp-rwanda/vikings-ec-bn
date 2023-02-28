import { WishlistController } from "../../controllers/wishlist.controller";
import express from "express";
import {
  checkIfProductIsInWishlist,
  addProductToWishlist,
  getUserWishes,
  checkProductNotInWishlist,
} from "../../middlewares/wishlist.middleware";
import { protectRoute, restrictTo } from "../../middlewares/auth.middleware";
import {
  checkIfProductExistsById,
  checkProductAvailable,
} from "../../middlewares/product.middleware";
import wishlistValidation from "../../validations/wishlist/wishlist.validation";

const wishlistrouter = express.Router();

wishlistrouter.post(
  "/product-wishes",
  protectRoute,
  restrictTo("admin", "buyer"),
  wishlistValidation,
  checkProductAvailable,
  getUserWishes,
  checkIfProductIsInWishlist,
  addProductToWishlist,
  WishlistController.addToWishlist
);

wishlistrouter.get(
  "/:productId/product-wishes",
  protectRoute,
  restrictTo("seller", "admin"),
  checkIfProductExistsById,
  WishlistController.getProductWishes
);

wishlistrouter.delete(
  "/:productId/product-wishes",
  protectRoute,
  restrictTo("admin", "buyer"),
  getUserWishes,
  checkIfProductExistsById,
  checkProductNotInWishlist,
  WishlistController.deleteFromWishlist
);

export default wishlistrouter;
