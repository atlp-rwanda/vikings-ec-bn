import {jwtTokens} from '../../src/database/models/index';
import { JwtUtility } from '../../src/utils/jwt.util';
import { verifyAndRevokeToken } from '../../src/middlewares/user.middleware';
import { describe,beforeEach,it, afterEach,expect,jest } from '@jest/globals';
import { removeAuthCode } from '../../src/middlewares/user.middleware';
import { UserService } from '../../src/services/user.service';
import { verifyAuthCode } from '../../src/middlewares/user.middleware';

describe('verifyAndRevokeToken', () => {
  let req, res, next, updateSpy;

  beforeEach(() => {
    req = { params: { token: 'validToken' } };
    res = { status: jest.fn(() => res), json: jest.fn() };
    next = jest.fn();
    updateSpy = jest.spyOn(jwtTokens, 'update');
  });

  afterEach(() => {
    updateSpy.mockRestore();
  });

  it('should return 403 status code and error message when token is invalid', async () => {
    JwtUtility.verifyToken = jest.fn(() => null);

    await verifyAndRevokeToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Failed to to verify email' });
    expect(updateSpy).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should update token and call next when token is valid', async () => {
    const decodedToken = { userId: 1 };
    JwtUtility.verifyToken = jest.fn(() => decodedToken);

    await verifyAndRevokeToken(req, res, next);

    expect(updateSpy).toHaveBeenCalledWith(
      { revoked: true },
      { where: { token: 'validToken' } }
    );
    expect(req.user).toBe(decodedToken);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

});


describe('verifyAuthCode', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { authCode: '1234' }, user: { authCode: '5678' } };
    res = { status: jest.fn(() => res), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 403 status code and error message when auth code does not match', async () => {
    await verifyAuthCode(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Code does not match. Try again' });
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should call next when auth code matches', async () => {
    req.body.authCode = '5678';

    await verifyAuthCode(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});


describe('removeAuthCode', () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { id: '123' } };
    res = {};
    next = jest.fn();
  });

  it('should call next and update user with null auth code', async () => {
    const updateUserSpy = jest.spyOn(UserService, 'updateUser').mockResolvedValueOnce();

    await removeAuthCode(req, res, next);

    expect(updateUserSpy).toHaveBeenCalledWith({ authCode: null }, '123');
    expect(next).toHaveBeenCalled();
  });

});
