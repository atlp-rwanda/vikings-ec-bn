import request from "supertest"
import {JwtUtility} from "../../src/utils/jwt.util"

describe('Testing Jwt functions', () => {
    test("Verify token", async() => {
        let testToken=" "
        const response = JwtUtility.verifyToken(testToken)
        expect(response).toBeDefined();
    })
});

