import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { WishService } from '../services/wishlist.service';
import {eventEmit, knownEvents} from '../utils/events.util';
import {knownNotificationType} from '../services/notification.service';
import {UserService} from '../services/user.service';

export class WishlistController {
  static async addToWishlist(req, res) {
    try {
      const { id: userId } = req.user;
      let product_id = req.body.productId;
      let wish = req.wishlist;
      if (!wish) {
        const newWish = {
          userId: userId,
          productsId: [product_id],
        };
        wish = await WishService.createWish(newWish);
      }
      const product = req.product;
      let wished_product = product.wished;
      wished_product += 1;
      await ProductService.updateProduct(
        { wished: wished_product },
        product.id
      );
      eventEmit(knownEvents.onNotification, {
        type:knownNotificationType.productWished,
        message:`Product ${product.name} has been wished by ${req.user.email}.
         know product has ${product.wished} `,
        receiverId: product.userId,
      });
      return res.status(201).json({
        wish: wish,
        message: 'Item added to wishlist successfully',
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Could not add product to wishlist, try again',
      });
    }
  }

  static async getProductWishes(req, res) {
    try {
      const product = req.product;
      const product_wished = product.wished;
      return res.status(200).json({
        message: `This product is currently having ${product_wished} wishes from people`,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Error occured while getting product wishes, try again',
      });
    }
  }

  static async getWishByUser(req, res) {
    try {
      let wishes = req.wishlist;
      let productsId = wishes.productsId;
      const products = await CartService.getCartProducts(productsId);
      const wishData = products.map((products) => ({
        name: products.name,
        price: products.price,
        images: products.images,
      }));
      return res.status(200).json({
        message: 'your wishlist',
        wish: wishData,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Error occured while getting product wishes, try again',
      });
    }
  }

  static async deleteFromWishlist(req, res) {
    try {
      const wishes = req.wishlist;
      const productsId = wishes.productsId;
      const { product_id } = req.params;
      await WishService.updateWishlist(
        { productsId: productsId },
        wishes.id
      );
      return res.status(200).json({
        product_id: product_id,
        message: 'Item removed from wishlist successfully',
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: 'Error occured while deleting Items from wishes, try again',
      });
    }
  }
}
