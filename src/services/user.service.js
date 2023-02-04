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
}

