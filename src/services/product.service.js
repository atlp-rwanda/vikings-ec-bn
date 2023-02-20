import { Products } from '../database/models/index';
import { User } from '../database/models/index';
import { Categories } from '../database/models/index';

export class ProductService {
  static async createProduct(product) {
    return await Products.create(product);
  }
  static async getAllProducts(size, page) {
    const offset = (page - 1) * size;
    const { count, rows } = await Products.findAndCountAll({
      limit: size,
      offset: offset,
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              'password',
              'authCode',
              'mustUpdatePassword',
              'lastTimePasswordUpdated',
            ],
          },
        },
        { model: Categories },
      ],
    });
    const totalPages = Math.ceil(count / size);
    const currentPage = page;
    const totalItems = count;
    return { totalPages, currentPage, totalItems, rows };
  }
}
