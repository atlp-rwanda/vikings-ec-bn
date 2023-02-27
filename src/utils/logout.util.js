import { jwtTokens } from '../database/models/index';
import { Op } from 'sequelize';

export const isAuthRevoked = async (token) => {
  return await await jwtTokens.findOne({
    where: {
      [Op.and]: [{ token: token }, { revoked: true }],
    },
  });
};
