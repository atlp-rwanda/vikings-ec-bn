import {expect, describe, test, beforeAll, afterEach} from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { UserService } from '../../src/services/user.service';
import { verifyAuthCode } from '../../src/middlewares/user.middleware';
import { removeAuthCode } from '../../src/middlewares/user.middleware';
import {

	invalidOTP,
	sellerId,
	sellerUser,
	randomId
} from '../mocks/user.mock';
import {closeAll} from '../../src/utils/scheduling.util';


beforeAll(async () => {
	await connectDB();
});

describe('Testing 2 FA', () => {
	test('Successful: code sent', async () => {
		const response = await request(app)
			.post('/api/v1/users/login/')
			.send(sellerUser);

		expect(response.statusCode).toEqual(403);
		expect(response.body.message).toBe('Check your email for verification code');
	});

	test('No auth code: Bad request', async()=>{
		const response = await request(app).post(`/api/v1/users/login/verify/${sellerId}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBe('authCode is required');
	});

	test('Invalid user id: User does not exist', async()=>{
		const response = await request(app).post(`/api/v1/users/login/verify/${randomId}`).send({authCode: '123456'});

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('User does not exist');
	});

	test('Invalid authCode: Code does not match. Try again', async()=>{
		const response = await request(app).post(`/api/v1/users/login/verify/${sellerId}`).send({authCode: invalidOTP});

		expect(response.statusCode).toBe(403);
		expect(response.body.message).toBe('Code does not match. Try again');
	});

});

describe('removeAuthCode middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        id: '76432d88-a891-4c4f-9b8f-aca96513f4dd',
      },
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call UserService.updateUser with null authCode and user ID', async () => {
    const updateUserSpy = jest.spyOn(UserService, 'updateUser');
    await removeAuthCode(req, res, next);
    expect(updateUserSpy).toHaveBeenCalledWith({ authCode: null }, req.user.id);
  });

  it('should call next function', async () => {
    await removeAuthCode(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('verifyAuthCode middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        authCode: '1234',
      },
      user: {
        authCode: '1234',
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next function if authCode matches', async () => {
    await verifyAuthCode(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 error if authCode does not match', async () => {
    req.body.authCode = '5678';
    await verifyAuthCode(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Code does not match. Try again' });
  });
});


afterEach(async () =>{
	await closeAll();
});
