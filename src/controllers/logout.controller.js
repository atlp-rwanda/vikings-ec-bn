import { logoutService } from '../services/token.service';

export const logout = async (req, res) => {
  try {
    const data = {
      token: req.token,
      revoked: true,
    };
    await logoutService.revokeToken(data);
    return res.status(200).json({
      message: 'Logged out',
    });
  } catch (err) {
    return res.status(500).json({ error: err, message: 'Failed to logout' });
  }
};
