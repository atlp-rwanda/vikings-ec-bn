/* eslint-disable no-undef */
import { JwtUtility } from '../../src/utils/jwt.util';

describe('Testing Jwt functions', () => {
  test('Verify token', async () => {
    let testToken = ' ';
    const JsonWebTokenError = JwtUtility.verifyToken(testToken);
    expect(JsonWebTokenError).toBeDefined();
  });
});
