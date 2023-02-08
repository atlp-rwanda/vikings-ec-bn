import { jwtTokens } from '../database/models/index';

export const isAuthRevoked = async (token) => {
  const tokenData = await jwtTokens.findOne({ where: { token: token } });
  if (tokenData.revoked === true) {
    return true;
  }
  return false;
};
