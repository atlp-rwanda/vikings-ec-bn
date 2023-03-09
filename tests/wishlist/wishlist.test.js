import app from "../../src/app";
import { connectDB } from "../../src/app";
import request from "supertest";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  jest,
} from "@jest/globals";
import {
  beansId,
  buyerToken,
  beans,
  jordan,
  sellerToken,
  jordanId,
  userId,
  randomId,
  wishlistId,
} from "../mocks/wishlist.mock";
import { closeAll } from "../../src/utils/scheduling.util";
import wishlistValidation from "../../src/validations/wishlist/wishlist.validation";
import {
    addProductToWishlist,
  checkIfProductIsInWishlist,
  checkProductNotInWishlist,
} from "../../src/middlewares/wishlist.middleware";
import { WishService } from "../../src/services/wishlist.service";
const next = jest.fn();

beforeAll(async () => {
  await connectDB();
});
describe("wishlists", () => {
  test("No authorization (adding to wishlist): 400 and unauthorized message", async () => {
    const response = await request(app)
      .post("/api/v1/wishlist/product-wishes")
      .send(jordanId);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Unauthorized request, try again");
  });

  test("should return a 400 status code and an error message when productId is missing", async () => {
    const response = await request(app)
      .post("/api/v1/wishlist/product-wishes")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "productId is required",
    });
  });
  
  test('should add a product to the wishlist', async () => {
    const wishlist = { id: wishlistId, productsId: [] };
    const req = { wishlist, body: { productId: beansId } };
    const res = {};

    WishService.updateWishlist = jest.fn();

    await addProductToWishlist(req, res, next);

    expect(wishlist.productsId).toContain(beansId);
    expect(WishService.updateWishlist).toHaveBeenCalledWith({ productsId: [beansId] }, wishlist.id);
    expect(req.wishlist).toEqual(wishlist);
    expect(next).toHaveBeenCalled();
  });

  test('should add a second product to update wishlist', async () => {
    const wishlist = { id: wishlistId, productsId: [] };
    const req = { wishlist, body: { productId: jordanId } };
    const res = {};

    WishService.updateWishlist = jest.fn();

    await addProductToWishlist(req, res, next);

    expect(wishlist.productsId).toContain(jordanId);
    expect(WishService.updateWishlist).toHaveBeenCalledWith({ productsId: [jordanId] }, wishlist.id);
    expect(req.wishlist).toEqual(wishlist);
    expect(next).toHaveBeenCalled();
  });
  

  test('should call next if there is no wishlist', async () => {
    const req = { body: { productId: beansId } };
    const res = {};

    await addProductToWishlist(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should call next() when productId is present", async () => {
    const req = { body: { productId: `${beansId}` } };
    const res = {};

    await wishlistValidation(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should return next if there is no wishlist", async () => {
    const req = {
      wishlist: null,
      body: {
        productId: `${beansId}`,
      },
    };
    const res = {};

    await checkIfProductIsInWishlist(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should return next if product is not in wishlist", async () => {
    const req = {
      wishlist: {
        productsId: [`${beansId}`],
      },
      body: {
        productId: `${jordanId}`,
      },
    };
    const res = {};

    await checkIfProductIsInWishlist(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should return 409 if product is already in wishlist", async () => {
    const req = {
      wishlist: {
        productsId: [`${beansId}`, `${jordanId}`, `${randomId}`],
      },
      body: {
        productId: `${beansId}`,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await checkIfProductIsInWishlist(req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Item already in wishlist",
    });
  });

  test("should return next if there is no wishlist", async () => {
    const req = {
      wishlist: null,
      params: {
        productId: `${beansId}`,
      },
    };
    const res = {};
    await checkProductNotInWishlist(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("should return 409 if product is not wishlist", async () => {
    const req = {
      wishlist: {
        productsId: [`${beansId}`, `${randomId}`],
      },
      params: {
        productId: `${jordanId}`,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    await checkProductNotInWishlist(req, res, next);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Item is not in wishlist",
    });
  });

  test("should return next if product is not in wishlist", async () => {
    const req = {
      wishlist: {
        productsId: [`${jordanId}`, `${randomId}`],
      },
      params: {
        productId: `${beansId}`,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await checkProductNotInWishlist(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("No authorization (getting wishes of product): 400 and unauthorized message", async () => {
    const response = await request(app)
      .get(`/api/v1/wishlist/${beansId}/product-wishes`)
      .send();

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Unauthorized request, try again");
  });

  test("No authorization (getting wishes by user): 400 and unauthorized message", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}/product-wishes`)
      .send();

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Unauthorized request, try again");
  });

  test("No wishlist: 500 and message", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}/product-wishes`)
      .set("Authorization", `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(500);
  });

  test("succesfully added", async () => {
    const response = await request(app)
      .post("/api/v1/wishlist/product-wishes")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send(beans);

    expect(response.statusCode).toBe(201);
  });

  test("add a product that already in wishlist", async () => {
    const response = await request(app)
      .post("/api/v1/wishlist/product-wishes")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send(beans);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toEqual("Item already in wishlist");
  });

  test("checking wishes for a product", async () => {
    const response = await request(app)
      .get(`/api/v1/wishlist/${beansId}/product-wishes`)
      .set("Authorization", `Bearer ${sellerToken}`);
    expect(response.statusCode).toBe(200);
  });

  test("checking wishes for a product that is not in wishlist", async () => {
    const response = await request(app)
      .get(`/api/v1/wishlist/${randomId}/product-wishes`)
      .set("Authorization", `Bearer ${sellerToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("Product not found");
  });

  test("checking user wishlist", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}/product-wishes`)
      .set("Authorization", `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(200);
  });

  test("checking user who is not in wishlist", async () => {
    const response = await request(app)
      .get(`/api/v1/users/${randomId}/product-wishes`)
      .set("Authorization", `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("User does not exist");
  });

  test("delete product which is not in wishlist", async () => {
    const response = await request(app)
      .delete(`/api/v1/wishlist/${jordanId}/product-wishes`)
      .set("Authorization", `Bearer ${buyerToken}`);;
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toEqual("Item is not in wishlist");
  });

  test("delete product which is not in wishlist", async () => {
    const response = await request(app)
      .delete(`/api/v1/wishlist/${beansId}/product-wishes`)
      .set("Authorization", `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(
      "Item removed from wishlist successfully"
    );
  });
});
afterEach(async () => {
  await closeAll();
});
