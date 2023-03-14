import request from 'supertest';
import app from '../../src/app';
import httpMocks from 'node-mocks-http';
import { UserController } from '../../src/controllers/user.controller';
import {
	existentGoogleProfile,
	googleProfile,
	token,
} from '../mocks/user.mock';
import { connectDB } from '../../src/app';
import { User } from '../../src/database/models/index';
import { JwtUtility } from '../../src/utils/jwt.util';
import { saveTokens } from '../../src/services/token.service';
import { googlePass } from '../../src/authentication/passport.authentication';
import {
	expect,
	describe,
	test,
	beforeAll,
	afterEach,
	beforeEach,
	it,
	jest,
} from '@jest/globals';
import { closeAll } from '../../src/utils/scheduling.util';
import { checkUserByEmail } from '../../src/middlewares/user.middleware';

googlePass();

beforeAll(async () => {
	await connectDB();
});

describe('Testing google authentication', () => {
	test('Successful google login', async () => {
		const response = httpMocks.createResponse();
		await UserController.googleAuthHandler(
			{
				user: googleProfile,
			},
			response
		);
		expect(response.statusCode).toBe(302);
	});
	test('Successful google login already in DB', async () => {
		const req = { user: existentGoogleProfile };
		const res = httpMocks.createResponse();
		await checkUserByEmail(req, res);
		expect(res.statusCode).toBe(302);
	});
	test('Testing the success redirect', async () => {
		const response = await request(app).get(
			`/api/v1/users/redirect/?key=${token}`
		);

		expect(response.body.message).toEqual('Thanks for logging in');
		expect(response.statusCode).toEqual(200);
	});

	test('Testing the failed redirect', async () => {
		const response = await request(app).get('/api/v1/users/redirect');

		expect(response.body.error).toEqual('Unauthorized');
		expect(response.statusCode).toEqual(401);
	});
});
describe('checkUserByEmail', () => {
	let req, res, next;

	req = {
		user: {
			emails: [{ value: 'test@example.com' }],
		},
	};
	res = {
		redirect: jest.fn(),
	};
	next = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should redirect to redirect endpoint if user exists', async () => {
		const user = {
			id: 1,
			email: 'test@example.com',
			role: 'user',
		};
		User.findOne = jest.fn().mockResolvedValue(user);
		JwtUtility.generateToken = jest.fn().mockReturnValue('testtoken');
		saveTokens.saveToken = jest.fn().mockResolvedValue();

		await checkUserByEmail(req, res, next);

		expect(User.findOne).toHaveBeenCalledWith({
			where: { email: 'test@example.com' },
		});
		expect(JwtUtility.generateToken).toHaveBeenCalledWith({
			id: 1,
			email: 'test@example.com',
			role: 'user',
		});
		expect(saveTokens.saveToken).toHaveBeenCalledWith({
			token: 'testtoken',
			revoked: false,
		});
		expect(res.redirect).toHaveBeenCalledWith(
			'/api/v1/users/redirect?key=testtoken'
		);
		expect(next).not.toHaveBeenCalled();
	});

	it('should call next if user does not exist', async () => {
		User.findOne = jest.fn().mockResolvedValue(null);

		await checkUserByEmail(req, res, next);

		expect(User.findOne).toHaveBeenCalledWith({
			where: { email: 'test@example.com' },
		});
		expect(JwtUtility.generateToken).not.toHaveBeenCalled();
		expect(saveTokens.saveToken).not.toHaveBeenCalled();
		expect(res.redirect).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalled();
	});
});
afterEach(async () => {
	await closeAll();
});
