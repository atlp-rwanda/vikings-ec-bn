import { Wishlist } from "../database/models/index";
import { ProductService } from "./product.service";
export class WishService {
  static async getWish(userId) {
    const wished = await Wishlist.findOne({ where: { userId: userId } });
    return wished;
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
