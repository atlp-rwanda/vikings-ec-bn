import { Products } from '../database/models/index';

export class ProductService {
  static async createProduct(product) {
    return await Products.create(product);
  }
}
