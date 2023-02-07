import bcrypt from 'bcrypt';

export class BcryptUtility {
  static async hashPassword(password) {
    const pasSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, pasSalt);
  }
}
