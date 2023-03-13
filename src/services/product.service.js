import { User } from '../database/models/index';
import { Products, Categories } from '../database/models/index';

export class ProductService {
  static async createProduct(product) {
    return await Products.create(product);
  }
  static async getAllProducts(limit=10, page=1) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Products.findAndCountAll({
      limit: limit,
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
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const totalItems = count;
    return { totalPages, currentPage, totalItems, rows };
  }
  static async updateProduct(fields, id) {
    return await Products.update({ ...fields }, { where: { id: id } });
  }

  static async getProductById(id) {
    return await Products.findByPk(id);
  }
  static async searchProduct(searchQuery, limit=10, page=1){
    const offset = ( page - 1) * limit;
    const { count, rows } = await Products.findAndCountAll({
      limit: limit,
      offset: offset,
      where: searchQuery,
      include: [{ model: Categories }]
    });
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const totalItems = count;
    return { totalPages, currentPage, totalItems, rows };
  }
  static async searchCategoryByName(categoryName) {
    return await Categories.findOne({
      where: { name: categoryName.toLowerCase() },
    });
  }
static async deleteProduct(id){
  return await Products.destroy({ where: { id: id }});
}
}
