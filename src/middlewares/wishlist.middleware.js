import { Wishlist } from "../database/models/index";
import { WishService } from "../services/wishlist.service";

export const getUserWishes = async (req, res, next) => {
  const { id: userId } = req.user;
  const userWishes = await WishService.getWish(userId);
  req.wishlist = userWishes;
  next();
};

export const checkIfProductIsInWishlist = async (req, res, next) => {
  const wishes = req.wishlist;
  const product_id = req.body.productId;
  if (!wishes) {
    return next();
  }
  const wished = wishes.productsId;
  const wishlistItem = wished.includes(product_id);
  if (!wishlistItem) {
    return next();
  } else {
    return res.status(409).json({ message: "Item already in wishlist" });
  }
};

export const checkProductNotInWishlist = async (req, res, next) => {
  const wishes = req.wishlist;
  const product_id = req.params.productId;
  if (!wishes) {
    return next();
  }
  const wished = wishes.productsId;
  const wishlistItem = wished.includes(product_id);
  if (!wishlistItem) {
    return res.status(409).json({ message: "Item is not in wishlist" });
  } else {
    return next();
  }
};

export const addProductToWishlist = async (req, res, next) => {
  const wishlist = req.wishlist;
  let product_id = req.body.productId;
  if (!wishlist) {
    return next();
  } else {
    let productsId = wishlist.productsId;
    productsId.push(product_id);
    await WishService.updateWishlist({ productsId }, wishlist.id);
  }
  req.wishlist = wishlist;
  next();
};
