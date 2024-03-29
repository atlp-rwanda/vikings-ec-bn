import request from 'supertest';
import app from '../../src/app';
import { userToRegister, profileSeeds } from '../mocks/user.mock';
import { expect, describe, test, it, jest, afterEach } from '@jest/globals';
import { UserService } from '../../src/services/user.service';
import { closeAll } from '../../src/utils/scheduling.util';
import { buyerToken } from '../mocks/cart.mock';
describe('Testing profile', () => {

	test('Successful get profile', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send(userToRegister);
		const { token } = response.body;
		const res = await request(app).get('/api/v1/users/profile').set('Authorization', 'Bearer ' + token);

		expect(res.statusCode).toBe(200);
	});

	test('Successful update', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send({ ...userToRegister, email: 'email@gmail.com' });
		const { token } = response.body;

		expect(response.body.token).toBeDefined();
		const res = await request(app).put('/api/v1/users/profile').set('Authorization', 'Bearer ' + token)
			.attach('avatar', `${process.cwd()}/assets/images/clean_the_room.png`)
			.field('firstname', profileSeeds.firstname)
			.field('socialLinks', profileSeeds.socialLinks)
			.field('birthdate', profileSeeds.birthdate)
			.field('billingAddress', profileSeeds.billingAddress)
			;

		expect(res.statusCode).toEqual(200);
	});

	test('Unsuccessful update with wrong image extension', async () => {
		const res = await request(app)
			.put('/api/v1/users/profile')
			.set('Authorization', 'Bearer ' + buyerToken)
			.attach('avatar', `${process.cwd()}/assets/images/clean_the_room.pdf`)
			.field('firstname', profileSeeds.firstname)
			.field('birthdate', profileSeeds.birthdate);

		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ message: 'Invalid extension for file \'clean_the_room.pdf\'' });
	});

	test('Unsuccessful update with invalid date', async () => {
		const birthdate = '2030-03-25';
		const res = await request(app)
			.put('/api/v1/users/profile')
			.set('Authorization', 'Bearer ' + buyerToken)
			.attach('avatar', `${process.cwd()}/assets/images/clean_the_room.png`)
			.field('firstname', profileSeeds.firstname)
			.field('birthdate', birthdate);

		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ message: 'Invalid date ' });
	});

	test('Unsuccessful update without date', async () => {
		const res = await request(app)
			.put('/api/v1/users/profile')
			.set('Authorization', 'Bearer ' + buyerToken)
			.attach('avatar', `${process.cwd()}/assets/images/clean_the_room.png`)
			.field('firstname', profileSeeds.firstname);

		expect(res.statusCode).toEqual(500);
	});

	test('Unsuccessful update with invalid date', async () => {
		const phone = '2030-03-25';
		const res = await request(app)
			.put('/api/v1/users/profile')
			.set('Authorization', 'Bearer ' + buyerToken)
			.attach('avatar', `${process.cwd()}/assets/images/clean_the_room.png`)
			.field('birthdate', profileSeeds.birthdate)
			.field('phone', phone);

		expect(res.statusCode).toEqual(400);
		expect(res.body).toEqual({ message: 'Invalid phone number ' });
	});

	test('failed to update profile returns 500', async () => {
		const requestSpy = jest.spyOn(UserService, 'updateUser');
		requestSpy.mockRejectedValue(new Error('Failed to retrieve'));

		const res = await request(app).put('/api/v1/users/profile').set('Authorization', 'Bearer ' + buyerToken)
			.attach('avatar', `${process.cwd()}/assets/images/clean_the_room.png`)
			.field('firstname', profileSeeds.firstname)
			.field('socialLinks', profileSeeds.socialLinks)
			.field('birthdate', profileSeeds.birthdate)
			.field('billingAddress', profileSeeds.billingAddress)
			;
		expect(res.statusCode).toEqual(500);
	});

	test('fail to update profile', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send({ ...userToRegister, email: 'test23423@gmail.com' });
		const { token } = response.body;
		const res = await request(app).put('/api/v1/users/profile').set('Authorization', 'Bearer ' + token)
			.field('viv', profileSeeds.firstname)
			;

		expect(res.statusCode).toBe(500);
	});
	it('should return status 500 when failed to get profile', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send({ ...userToRegister, email: 'te01@gmail.com' });
		const { token } = response.body;


		const requestSpy = jest.spyOn(UserService, 'getUserById');
		requestSpy.mockRejectedValue(new Error('Failed to retrieve posts'));

		const res = await request(app).get('/api/v1/users/profile').set('Authorization', 'Bearer ' + token);

		expect(res.statusCode).toBe(500);
		requestSpy.mockRestore();
	});

	it('should return status 500 when failed to updating profile', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send({ ...userToRegister, email: 'emai88l@gmail.com' });
		const { token } = response.body;
		const requestSpy = jest.spyOn(UserService, 'updateUser');
		requestSpy.mockRejectedValue(new Error('Failed to retrieve'));

		const res = await request(app).put('/api/v1/users/profile').set('Authorization', 'Bearer ' + token)
			.field('firstname', profileSeeds.firstname)
			;

		expect(res.statusCode).toBe(500);
		requestSpy.mockRestore();
	});
	it('should return status 500 when failed to Register', async () => {
		const requestSpy = jest.spyOn(UserService, 'register');
		requestSpy.mockRejectedValue(new Error('Failed to retrieve'));

		const response = await request(app)
			.post('/api/v1/users/register')
			.send({ ...userToRegister, email: 'emai88rrl@gmail.com' });
		expect(response.statusCode).toBe(500);
		requestSpy.mockRestore();
	});




});
afterEach(async () => {
	await closeAll();
});
