import products from "../database/models/products";
import sales from "../database/models/sales";
import { ProductService } from "../services/product.service";
import { WishService } from "../services/wishlist.service";

export class StatsController {
  static async getStats(req, res) {
    try {
      return res.status(200).json({
        message: "statistics",
        ...req.stats,
        
      });

    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Could not get stats, try again",
      });
    }
  }
}
