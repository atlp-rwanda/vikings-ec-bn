import {afterEach, describe, expect, jest, test} from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import {adminCredentials} from '../mocks/user.mock';
import {closeAll} from '../../src/utils/scheduling.util';
import {NotificationService} from '../../src/services/notification.service';

describe('Test notifications', () => {

    test('Getting notifications', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(adminCredentials);
        const {token} = response.body;
        expect(token).toBeDefined();
        const res = await request(app).get('/api/v1/notifications').set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toBe(200);
    });
    test('wrong limit in getting notifications notifications', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(adminCredentials);
        const {token} = response.body;
        expect(token).toBeDefined();
        const res = await request(app).get('/api/v1/notifications?limit=x').set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toBe(400);
    });
    test('wrong page in getting notifications notifications', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send(adminCredentials);
        const {token} = response.body;
        expect(token).toBeDefined();
        const res = await request(app).get('/api/v1/notifications?page=eric').set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toBe(400);
    });


    test('fail to get notifications', async () => {
        const requestSpy = jest.spyOn(NotificationService, 'getNotifications');
        requestSpy.mockRejectedValue(new Error('Failed to retrieve posts')); // mock it throws an Error object

        const response = await request(app)
            .post('/api/v1/users/login')
            .send(adminCredentials);
        const {token} = response.body;
        expect(token).toBeDefined();
        const res = await request(app).get('/api/v1/notifications').set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toBe(500);
        requestSpy.mockRestore();
    });

}
);

afterEach(async () =>{
    await closeAll();
});