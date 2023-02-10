import jwt from "jsonwebtoken";
import jwtTokens from "../database/models/jwt-tokens";
import { logoutService } from "../services/token.service";

export const logout = async (req, res) => {
  try {
    const data = {
      token: req.token,
      revoked: true,
    };
    const savedToken = await logoutService.revokeToken(data).then(() => {
      res.status(200).json({
        message: 'Logged out',
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err, message: 'Failed to logout' });
  }
};
