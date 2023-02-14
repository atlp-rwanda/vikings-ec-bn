import { User } from '../database/models/index.js';

export class UserService {
  static async register(user) {
    return await User.create(user);
  }

  static async updateUser(fields, id) {
    return await User.update({ ...fields }, { where: { id: id } });
  }
}

