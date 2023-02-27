import {
  expect,
  describe,
  jest,
  it,
  beforeAll,
  afterEach,
} from '@jest/globals';
import { connectDB } from '../../src/app';
import { closeAll } from '../../src/utils/scheduling.util';
import { ProductService } from '../../src/services/product.service';
import { checkIfProductExistsById } from '../../src/middlewares/product.middleware';
import { schedule } from '../../src/utils/scheduling.util';

beforeAll(async () => {
  await connectDB();
});

jest.useFakeTimers();
jest.mock('../../src/services/product.service');
jest.mock('../../src/utils/jwt.util');

describe('checkIfProductExistsById middleware', () => {
  const req = { params: { productId: '1' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next if product exists', async () => {
    const product = { id: '1', name: 'Product 1' };
    ProductService.getProductById.mockResolvedValueOnce(product);

    await checkIfProductExistsById(req, res, next);

    expect(ProductService.getProductById).toHaveBeenCalledWith('1');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 if product does not exist', async () => {
    ProductService.getProductById.mockResolvedValueOnce(null);

    await checkIfProductExistsById(req, res, next);

    expect(ProductService.getProductById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should schedule the provided callback function to run at the given repetition duration', () => {
    const repetitionDuration = '0 3 * * *'; // Run at 3:00am every day
    const callback = jest.fn();
    schedule(repetitionDuration, callback);
    jest.advanceTimersByTime(24 * 60 * 60 * 1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(24 * 60 * 60 * 1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

afterEach(async () => {
  await closeAll();
});
