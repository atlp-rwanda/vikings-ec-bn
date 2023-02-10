import request from "supertest"
import app from '../../src/app';
describe('/', () => {
    test("check welcome message",async()=>{
        const response=await request(app)
        .get('/api/v1/')
        expect(response.statusCode).toBe(200);
    })
});
