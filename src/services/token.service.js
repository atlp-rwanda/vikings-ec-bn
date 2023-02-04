import { jwtTokens } from '../database/models/index.js';

export class saveTokens {
  static async saveToken(token) {
    return await jwtTokens.create(token);
  }
}
export class logoutService {
  static async revokeToken(data) {
    let token = data.token;
    await jwtTokens.update(
      { revoked: 'true' },
      {
        where: { token: token },
      }
    );
  }
}
