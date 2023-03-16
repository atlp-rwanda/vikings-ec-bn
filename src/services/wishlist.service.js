import { Wishlist } from '../database/models/index';
import {Op} from 'sequelize';
export class WishService {
  static async getWish(userId) {
    const wished = await Wishlist.findOne({ where: { userId: userId } });
    return wished;
  }
  static async getWishesFromProduct(productId) {
    return await Wishlist.findAll({
      where: {
        productsId: {
          [Op.contains]: [productId],
        },
      },
    });
  }

  static async createWish(wish) {
    const createWish = await Wishlist.create(wish);
    return createWish;
  }

  static async updateWishlist(fields, wishlistId) {
    const update = await Wishlist.update(
      { ...fields },
      { where: { id: wishlistId } }
    );
    return update;
  }
}
