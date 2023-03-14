import { jwtTokens } from '../database/models/index';
import { Op } from 'sequelize';

export const isAuthRevoked = async (token) => {
  return await jwtTokens.findOne({
    where: { token: token },
  });
};
