import { User } from '../database/models/index.js';

export class UserService {
  static async register(user) {
    return await User.create(user);
  }

  static async getUserById(id) {
    return await User.findOne({
      where: {id: id},
    });
  }
  static async updateUser(fields, id) {
    return await User.update({ ...fields }, { where: { id: id } });
  }
  static async findAll(){
    return await User.findAll();
  }
  static async getAllUsers(page, limit) {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    const totalPages = Math.ceil(count / limit);
    return {
      meta: {
        totalItems: count,
        itemCount: rows.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
      items: rows,
    };
  }
}

