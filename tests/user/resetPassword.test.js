import request from "supertest";
import app from "../../src/app";
import { connectDB } from "../../src/app";
import { resetEmail, successResetRegister } from "../mocks/user.mock";
import { JwtUtility } from "../../src/utils/jwt.util";
import { closeAll } from '../../src/utils/scheduling.util';
import {
  successPasswordUpdate,
  invalidPasswordUpdate,
  verifiedLogin,
  resetPassword,
} from "../mocks/user.mock";
import dotenv from "dotenv";
import { describe, expect, test, afterEach, beforeAll } from '@jest/globals';
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

let resetToken = "";
let newPassword = "Sracerimo@123";

describe("Test Password reset", () => {
  test("Successful Registration", async () => {
    const response = await request(app)
      .post("/api/v1/users/register")
      .send(successResetRegister);
    expect(response.statusCode).toBe(201);
  });

  test('send email to get token', async () => {
    const response = await request(app)
      .post('/api/v1/users/forgot-password')
      .send(resetEmail);
    const url = new URL(response.body.message);
    const searchParams = new URLSearchParams(url.search);
    resetToken = searchParams.get('token');
    expect(response.statusCode).toBe(200);
    expect(resetToken).toBeDefined();
  });

  test('Successfully sent email', async () => {
    const response = await request(app)
      .post('/api/v1/users/forgot-password')
      .send(resetEmail);
    expect(response.statusCode).toBe(200);
  });

  test('successfully updated', async() => {
    const response = await request(app)
    .patch(`/api/v1/users/reset-password/${resetToken}`)
    .send(resetPassword);
    expect(response.statusCode).toBe(200);
  })

describe('resetValidation file test', () => {
  test('returns a 400 error if the password is too short', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/reset-password/${resetToken}`)
      .send({ newPassword: 'abc12' })
      .expect(400);
  })
});
});
afterEach(async () => {
  await closeAll();
});