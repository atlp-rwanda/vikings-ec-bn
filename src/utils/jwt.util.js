import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class JwtUtility {
  static generateToken(userData, exp='1d') {
    return JWT.sign(userData, process.env.SECRET_TOKEN, { expiresIn: exp });
  }

  static verifyToken(token) {
    return JWT.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
  }
}
